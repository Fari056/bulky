import React, { useRef, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { height } from 'react-native-dimension'
import { useSelector } from 'react-redux'
import { DocRef, saveData, uniqueID, uploadProfileImage } from "../../../../../backend/utility"
import { ComponentWrapper, DueButtons, Hrline, LargeText, MainHeader, MainWrapper, PaymentBottomSheet, Spacer } from '../../../../../components'
import { SCREEN, colors, fontFamily, fontSize } from '../../../../../constants'
import { HelperPriceCard, HelperTotalCard } from '../../components'
import { useStripe } from '../../../../../hooks'
import { ToastError } from '../../../../../utilities'

const Bill = ({ navigation, route }) => {

  const { navigate, goBack } = navigation
  const request_redux = useSelector(state => state?.requestData)
  const user_redux = useSelector(state => state?.user)
  const [userid, setUserId] = useState(user_redux?.id)
  const [loading, setLoading] = useState(false)

  const { ReqStripePayment } = useStripe();

  const RBSheet1 = useRef();
  let delivery_charges = request_redux?.deliverydetails?.totalCharges
  let truck_delivery_charges = 250
  let sales_tax = 30
  let other_charges = 0
  let total_charges = delivery_charges + truck_delivery_charges + sales_tax + other_charges

  const SubmitRequest = async () => {
    setLoading(true);
    const updatedItems = await Promise.all(
      request_redux?.items?.map(async (item) => {
        let imgs = [];
        if (item?.images?.length > 0) {
          try {
            await Promise.all(
              item?.images?.map(async (image) => {
                if (image?.path) {
                  let name = image?.path?.split("/").pop();
                  let path = `${userid}/images/${name}`;
                  let img = await uploadProfileImage(image?.path, path);
                  imgs.push(img);
                  console.log(`Uploaded image: ${img}`);
                } else {
                  console.error(`Image path is invalid: ${image}`);
                }
              })
            );
          } catch (imageError) {
            console.error(`Error uploading images for item ${item.id}:`, imageError);
          }
        }
        return { ...item, images: imgs };
      })
    );
    try {
      let _id = uniqueID();
      let userRef = DocRef("users", userid);
      const dataToSave = {
        id: _id,
        ...request_redux,
        items: updatedItems,
        userid: userid,
        userRef: userRef,
        status: "pending",
        createdAt: Date.parse(new Date()),
        updatedAt: Date.parse(new Date()),
      };
      const res = await saveData("bookings", _id, dataToSave);
      if (res) {
        navigate(SCREEN.Submitted);
      } else {
        console.error("Error saving booking data", res);
      }
    } catch (error) {
      console.error("Error in SubmitRequest:", error);
    } finally {
      setLoading(false);
    }
  };

  const HandlePayment = async () => {
    try {
      if (user_redux?.id) {
        setLoading(true)
        let res = await ReqStripePayment(user_redux?.id, total_charges * 100)
        if (res?.success) {
          await SubmitRequest()
        }
        else {
          setLoading(false)
          ToastError(res?.message)
        }
      }
    } catch (error) {
      console.error("Error in HandlePayment:", error);
    } finally {
      setLoading(false);
    }

  }

  return (
    <MainWrapper>
      <ComponentWrapper>
        <MainHeader title={"Bill to pay"} />
        <Text style={styles.text}>
          Suspendisse id elit vitae tellus sollicitudin placerat. Aliquam
          molestie orci posuere dolor
        </Text>
        <Spacer isBasic />
        <LargeText color={colors.appTextColor1}>Charges</LargeText>
      </ComponentWrapper>
      <HelperPriceCard title={"Truck Delivery Charges"} value={`$${truck_delivery_charges}`} />
      <HelperPriceCard title={"Helper Charges"} value={`$${delivery_charges}`} />
      <HelperPriceCard title={"Sales Tax"} value={`$${sales_tax}`} />
      <HelperPriceCard title={"Other Charges"} value={`$${other_charges}`} />
      <Hrline Width={"90%"} style={styles.hrline} />
      <HelperTotalCard title={"Total"} value={`$${total_charges}`} />
      <DueButtons
        isLoading={loading}
        text={"Pay now"}
        // onPress={SubmitRequest}
        onPress={HandlePayment}
        onBack={() => goBack()}
      />
      <PaymentBottomSheet
        heights={height(48)}
        innerRef={RBSheet1}
        onPressCard={(item) => {
          RBSheet1.current.close();
          navigate(SCREEN.addNewCard, { type: "billpay" });
        }}
      />
    </MainWrapper>
  );
}

export default Bill

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
    color: colors.appTextColor2,
    fontSize: fontSize.regular,
    fontFamily: fontFamily.appTextLight,
    marginVertical: 20
  },
  hrline: {
    alignSelf: 'center',
    marginVertical: 20,
    backgroundColor: colors.appTextColor4

  }
})