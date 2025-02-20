import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { ComponentWrapper, MainHeader, MainWrapper } from '../../../components'
import { AbsoluteButton, FeedBackInput } from '../../../components/appComponents/staticComponents'
import { useSelector } from 'react-redux'
import { saveDataWithoutDocId } from '../../../backend/utility'
const FeedBack = ({ navigation }) => {
     const [feedBack, setFeedBack] = useState("");
     const user = useSelector((state) => state.user);
    //  console.log("user ", user.id)
    const { goBack } = navigation
        const handleSendFeedback = async () => {
          try {
            const feedbackData = {
              userId: user.id,
              description: feedBack,
              createdAt: Date.parse(new Date()),
            };
            await saveDataWithoutDocId("feedbacks", feedbackData);
            console.log("Feedback sent!");
            goBack();
          } catch (error) {
            console.error("Error sending feedback: ", error);
          }
        };
    return (
      <MainWrapper>
        <ComponentWrapper>
          <MainHeader title={"Feedback"} />
          <FeedBackInput feedBack={feedBack} onChangeFeedBack={setFeedBack} />
        </ComponentWrapper>
        <AbsoluteButton title={"SEND FEEDBACK"} onPress={handleSendFeedback} />
      </MainWrapper>
    );
}

export default FeedBack