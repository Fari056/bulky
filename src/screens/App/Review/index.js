import { View, Text } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import { ComponentWrapper, MainWrapper, MainHeader, Spacer } from '../../../components'
import { AbsoluteButton, RateToRider } from '../../../components/appComponents/staticComponents'
import { height } from 'react-native-dimension'
import { SCREEN } from '../../../constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSelector } from 'react-redux'
import {
  saveData,
  DocRef,
  uniqueID,
} from "../../../backend/utility";
import { addReview } from '../../../redux/actions'
import { useDispatch } from 'react-redux'
const Review = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { imageUrl } = route.params || {};
   const user_redux = useSelector((state) => state.user);
    const { replace, navigate } = navigation
     const [review, setReview] = useState("");
     const [rating, setRating] = useState(1);
   const sub = async () => {
      const currentDate = new Date();
       let id = uniqueID();
       let userRef = DocRef("users", user_redux.id);
       const driverId = "";
       const reviewData = {
         id: id,
         userId: user_redux.id,
         driverId: driverId,
         review,
         rating,
         imageUrl,
         userRef: userRef,
         timestamp: currentDate,
       };
        let res = await saveData("reviews", id, reviewData);
        if (res) {
            dispatch(addReview(reviewData));
            navigate(SCREEN.sendReward);
        }
        else {
          console.log("Error saving review data");
        }
   };

    return (
      <MainWrapper>
        <KeyboardAwareScrollView>
          <ComponentWrapper>
            <MainHeader title={"Review"} />
            <Spacer height={height(4)} />
            <RateToRider
              user={user_redux}
              review={review}
              onChangeReview={setReview}
              setRating={setRating}
            />
          </ComponentWrapper>
        </KeyboardAwareScrollView>
        <AbsoluteButton
          title={"SUBMIT"}
          onPress={sub}
        />
      </MainWrapper>
    );
}

export default Review