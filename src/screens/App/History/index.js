import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ComponentWrapper, MainHeader, MainWrapper } from '../../../components'
import { HistoryList } from '../../../components/appComponents/generalComponents'
import { getAllOfCollection } from '../../../backend/utility'
import { useSelector } from 'react-redux'
const History = () => {
  const user_redux = useSelector((state) => state.user);
  const [history, setHistory] = useState([]);
  useEffect(() => {
    History();
  }, []);
  const History = async () => {
    try {
      const data = await getAllOfCollection("bookings");
      const filteredHistory = data.filter(
        (history) => history.userid === user_redux.id
      );
      setHistory(filteredHistory);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };
  return (
    <MainWrapper>
      <ComponentWrapper>
        <MainHeader title={'History'} />
        <HistoryList history={history} user={user_redux} />
      </ComponentWrapper>
    </MainWrapper>
  )
}

export default History