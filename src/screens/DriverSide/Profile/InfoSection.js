import { StyleSheet } from 'react-native'
import { } from 'react-native'
import React from 'react'
import { ComponentWrapper, ProfileInfoCard, ProfileInfoCard_, TinyTitle, Wrapper } from '../../../components'
import { colors } from '../../../constants'
import { appStyles } from '../../../utilities'
import { width } from 'react-native-dimension'
export const InfoSection = ({ user }) => {
    const Images = [...(user?.licenseImg || []), ...(user?.insuranceImg || [])];
    const cunt = Images.length;
    const isVerified = user?.licenseImg?.length > 1;
    return (
      <Wrapper>
        <ComponentWrapper>
          <TinyTitle>Personal Information</TinyTitle>
        </ComponentWrapper>
        <Wrapper style={styles.wrapper}>
          <ProfileInfoCard
            title={"First Name"}
            text={user?.firstName}
          />
          <ProfileInfoCard
            title={"Last Name"}
            text={user?.lastName}
          />
          <ProfileInfoCard title={"Email"} text={user?.email} />
          <ProfileInfoCard
            title={"Phone Number"}
            text={user?.phone}
          />
          <ProfileInfoCard_
            title={"location"}
            text={user?.location}
          />
          <ProfileInfoCard
            title={"License"}
            textColor={
              isVerified ? colors.appTextColor26 : colors.appTextColor27
            }
            withoutBorder
            text={isVerified ? "Verified" : "Not Verified"}
          />
        </Wrapper>
        {user?.type == "driver" && (
          <>
            <ComponentWrapper>
              <TinyTitle>vehicle Details</TinyTitle>
            </ComponentWrapper>
            <Wrapper style={styles.wrapper}>
              <ProfileInfoCard
                title={"Company"}
                text={user?.make}
              />
              <ProfileInfoCard
                title={"Model"}
                text={user?.model}
              />
              <ProfileInfoCard
                title={"Insurance Company"}
                text={user?.vehicleData?.class}
              />
              <ProfileInfoCard title={"Type"} text={user?.vehicleData?.type} />
              <ProfileInfoCard
                title={"Insurance Number"}
                text={user?.vehicleData?.insuranceNumber}
              />
              <ProfileInfoCard
                title={"Color"}
                text={user?.vehicleData?.color}
              />
              <ProfileInfoCard
                title={"Images"}
                withoutBorder
                text={`${cunt} image${cunt !== 1 ? "s" : ""}`}
              />
            </Wrapper>
          </>
        )}
      </Wrapper>
    );
}


const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 10,
        marginHorizontal: width(5),
        marginVertical: width(3),
        ...appStyles.shadow
    }
})