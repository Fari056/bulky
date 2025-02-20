import { View, Text } from 'react-native'
import React , {useEffect, useState} from 'react'
import { ComponentWrapper, MainHeader, MainWrapper } from '../../../components'
import { ReviewList } from '../../../components/appComponents/generalComponents'
import { getAllOfCollection } from '../../../backend/utility'
import { useSelector } from 'react-redux'
const Reviews = () => {
      const user_redux = useSelector((state) => state.user);
      //  const reviews = useSelector((state) => state.reviews);
      // console.log(reviews)
      const [review, setreview] = useState([]);
     useEffect(() => {
       fetchReviews();
     }, []);
     const fetchReviews = async () => {
       try {
         const data = await getAllOfCollection("reviews");
          const userReviews = data.filter(
           (review) => review.userId === user_redux.id
         );
         setreview(userReviews);
       } catch (error) {
         console.error("Error fetching reviews:", error);
       }
     };
    return (
      <MainWrapper>
        <ComponentWrapper>
          <MainHeader title={"Reviews"} />
        </ComponentWrapper>
        <ReviewList
          reviews={review}
          userProfile={user_redux.photo}
          userName={`${user_redux.firstName} ${user_redux.lastName}`}
        />
      </MainWrapper>
    );
}

export default Reviews