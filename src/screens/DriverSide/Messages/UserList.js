import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { ChatUserCard, MainWrapper, Spacer } from '../../../components'
import { ChatUsers } from '../../../../tempData'
import { height } from 'react-native-dimension'
import { SCREEN } from '../../../constants'

const UserList = ({ onPressUser }) => {

    return (
        <MainWrapper>
            <FlatList style={styles.flatList}
                data={ChatUsers}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <Spacer isBasic />}
                ListHeaderComponent={() => <Spacer height={height(3)} />}
                ListFooterComponent={() => <Spacer height={height(3)} />}
                removeClippedSubviews={false}
                renderItem={({ item }) => {
                    return (
                        <ChatUserCard onPress={onPressUser} name={item?.name} time={item?.time} message={item?.message} source={{ uri: item?.profile }} />
                    )
                }}
            />
        </MainWrapper>
    )
}

export default UserList

const styles = StyleSheet.create({})