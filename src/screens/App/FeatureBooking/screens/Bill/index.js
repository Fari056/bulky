import { StyleSheet, Text, View } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import { ComponentWrapper, DueButtons, Hrline, LargeText, MainHeader, MainWrapper, PaymentBottomSheet, Spacer } from '../../../../../components'
import { SCREEN, colors, fontFamily, fontSize } from '../../../../../constants'
import { HelperPriceCard, HelperTotalCard } from '../../components'
import { height } from 'react-native-dimension'
import {
  DocRef,
  saveData,
  saveDataWithoutDocId,
  uniqueID,
  uploadFile,
  uploadProfileImage
} from "../../../../../backend/utility";
import { getCurrentUserId } from '../../../../../backend/auth'
import { useSelector } from 'react-redux'
const Bill = ({ navigation, route }) => {
  const { navigate, goBack } = navigation
  const user_redux = useSelector(state => state?.user)
  const [userid, setUserId] = useState(user_redux?.id)
  const [loading, setLoading] = useState(false)
  const {
    itemdetails,
    pickupdetails,
    destinationdetails,
    deliverydetails,
    date,
    time,
    pickuppoint,
    destination,
  } = route.params;
  const RBSheet1 = useRef();
  const SubmitRequest = async () => {
    setLoading(true);
    try {
      const validatedItemDetails = itemdetails.map((item) => ({
        id: item?.id,
        qty: item?.selectedItem?.count || 1,
        title: item?.title,
        type: item?.selectedItem?.title || item?.type,
        images: item?.images || [],
      }));

      let id = uniqueID();
      let userRef = DocRef("users", userid);
      const dataToSave = {
        id: id,
        pickupdetails: pickupdetails,
        destinationdetails: destinationdetails,
        deliverydetails: deliverydetails,
        date: date,
        time: time,
        status: "pending",
        userid: userid,
        userRef: userRef,
        createdAt: Date.parse(new Date()),
        updatedAt: Date.parse(new Date()),
      };
      const updatedItems = await Promise.all(
        validatedItemDetails.map(async (item) => {
          let imgs = [];
          if (item?.images?.length > 0) {
            try {
              await Promise.all(
                item.images.map(async (image) => {
                  if (image?.path) {
                    let name = image.path.split("/").pop();
                    let path = `${userid}/images/${name}`;
                    let img = await uploadProfileImage(image.path, path);
                    imgs.push(img);
                    console.log(`Uploaded image: ${img}`);
                  } else {
                    console.error(`Image path is invalid: ${image}`);
                  }
                })
              );
            } catch (imageError) {
              console.error(
                `Error uploading images for item ${item.id}:`,
                imageError
              );
            }
          }
          return { ...item, images: imgs };
        })
      );
      dataToSave.items = updatedItems;
      const res = await saveData("bookings", id, dataToSave);
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
      <HelperPriceCard title={"Truck Delivery Charges"} value={"$2,50"} />
      <HelperPriceCard
        title={"Helper Charges"}
        value={deliverydetails.totalcharges}
      />
      <HelperPriceCard title={"Sales Tax"} value={"$30"} />
      <HelperPriceCard title={"Other Charges"} value={"$00"} />
      <Hrline Width={"90%"} style={styles.hrline} />
      <HelperTotalCard title={"Total"} value={"$500.00"} />
      <DueButtons
        isLoading={loading}
        text={"Pay now"}
        onPress={SubmitRequest}
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