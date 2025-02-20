import React , {useState}from 'react'
import { View, Text } from 'react-native'
import { ComponentWrapper, MainWrapper, ScrollView, Spacer, TextInputBordered, } from '../../../components'
import { AbsoluteButton, CustomDropDown, DriverProfileTitle, ImagePickerComponent, RowCustomDropDown, TitleWithDescription } from '../../../components/appComponents/staticComponents'
import { VehicleClass, VehicleColors, VehicleModal, VehicleName, VehicleType, vehicleCompanies } from '../../../../tempData'
import { SCREEN } from '../../../constants'
import { color } from 'react-native-elements/dist/helpers'
const CompleteDriverProfile = ({ navigation , route}) => {
    const { navigate } = navigation
     const { firstName,
      lastName,
      location,
      phone: phoneNumber,
      isActive, photo } = route.params;
     const [loading, setLoading] = useState(false);
    const [Make, setMake] = useState("");
    const [Model, setModel] = useState("");
    const [Color, setColor] = useState("");
    const [Class, setClass] = useState("");
    const [Type, setType] = useState("");
    const [Number, setNumber] = useState( "");
     const [imageUrls, setImageUrls] = useState([]);
     const snd = (urls) => {
       console.log("Image URLs received:", urls);
       setImageUrls(urls);
     };
const save = async () => {
  setLoading(true)
  try {
     const vehicleData = {
         make: Make,
         model: Model,
         color: Color,
         class: Class,
         type: Type,
         insuranceNumber: Number,
         imageUrl: imageUrls,
     };
     const dataToSend = {
      firstName,
      lastName,
      location,
      phone: phoneNumber,
      isActive: true,
      photo,
      vehicleData,
     };
      navigate(SCREEN.scanDriverInsuranceCard, { driverdata: dataToSend });
    setLoading(false)
  } catch (error) {
    setLoading(false)
    console.error("Error saving driver profile: ", error);
  }
};
    return (
      <MainWrapper>
        <ComponentWrapper>
          <ScrollView>
            <DriverProfileTitle description={"(vehicle Details)"} />
            <CustomDropDown
              title={"Vehicle Make"}
              placeholder={"Enter vehicle make"}
              initialItems={vehicleCompanies}
              setValue={setMake}
              value={Make}
            />
            <CustomDropDown
              title={"Vehicle Model"}
              placeholder={"Enter vehicle model"}
              initialItems={VehicleModal}
              setValue={setModel}
              value={Model}
            />
            <CustomDropDown
              title={"Vehicle Color  "}
              placeholder={"Select vehicle color"}
              initialItems={VehicleColors}
              setValue={setColor}
              value={Color}
            />
            <CustomDropDown
              title={"Vehicle Class  "}
              placeholder={"Select vehicle class"}
              initialItems={VehicleClass}
              setValue={setClass}
              value={Class}
            />
            <CustomDropDown
              title={"Vehicle Type  "}
              placeholder={"Select vehicle type"}
              initialItems={VehicleType}
              setValue={setType}
              value={Type}
            />
            <Spacer isBasic />
            <TextInputBordered
              title={"Insurance Number"}
              placeholder={"Enter your vehicle insurance number"}
              onChangeText={setNumber}
              value={Number}
              editable={true}
            />
            <ImagePickerComponent onImagesSelected={snd} />
          </ScrollView>
        </ComponentWrapper>
        <AbsoluteButton
          isLoading={loading}
          title={"NEXT"}
          onPress={async () => {
            await save();
          }}
        />
      </MainWrapper>
    );
}
export default CompleteDriverProfile