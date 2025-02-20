import { View, Text } from 'react-native'
import React from 'react'
import { MainHeader, MainWrapper, SendRewardFooter } from '../../../components'
import RewardDescription from './RewardDescription'
import RewardPriceList from './RewardPriceList'
import{width} from 'react-native-dimension'
import { SCREEN } from '../../../constants'
const SendReward = ({navigation}) => {
  const {navigate} = navigation
  return (
    <MainWrapper>
      <MainHeader style={{marginHorizontal:width(5)}} title={'Send Reward'} />
      <RewardDescription />
      <RewardPriceList />
      <SendRewardFooter onPressColored={()=>navigate(SCREEN.rewardSended)} onPressBordered={()=>navigate(SCREEN?.clientHome)}/>
    </MainWrapper>
  )
}

export default SendReward