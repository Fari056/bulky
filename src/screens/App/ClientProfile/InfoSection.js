import { View, Text } from 'react-native'
import React from 'react'
import { ProfileInfoCard, Wrapper } from '../../../components'

export const InfoSection = ({ user }) => {
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";
  const email = user?.email || "";
  const phone = user?.phone || "";
  const location = user?.location || "";

  return (
    <Wrapper>
      <ProfileInfoCard title={"First Name"} text={firstName} />
      <ProfileInfoCard title={"Last Name"} text={lastName} />
      <ProfileInfoCard title={"Email"} text={email} />
      <ProfileInfoCard title={"Phone Number"} text={phone} />
      <ProfileInfoCard title={"Location"} text={location} />
    </Wrapper>
  );
}
