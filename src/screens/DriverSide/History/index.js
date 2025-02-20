import React, { useState, useEffect } from 'react'
import { ComponentWrapper, MainHeader, MainWrapper } from '../../../components'
import { YourOrderHistory } from '../../../components/appComponents/generalComponents'
import { useSelector } from 'react-redux'
import { getCurrentUserId } from '../../../backend/auth'
const History = () => {
   const bookings = useSelector((state) => state.bookings);
  const [history, setHistory] = useState(bookings);
   useEffect(() => {
     const fetch = async () => {
       const userId = await getCurrentUserId();
       if (bookings && Array.isArray(bookings)) {
         const filteredHistory = bookings.filter(
           (booking) =>
             (booking.status === "accept" || booking.status === "ignore") &&
             booking.driverId === userId
         );
         setHistory(filteredHistory);
       }
     };

     fetch();
   }, [bookings]);
  return (
    <MainWrapper>
      <ComponentWrapper>
        <MainHeader title={'History'} />
      </ComponentWrapper>
      <YourOrderHistory history={history} />

    </MainWrapper>
  )
}

export default History