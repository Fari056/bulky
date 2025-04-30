import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { colors } from '../../../constants'
import { ButtonWithIcon, MediumText, RegularText, RowWrapper, RowWrapperBasic, Spacer, Wrapper } from '../../../components'
import { totalSize, height, width } from 'react-native-dimension'


const TransactionList = ({ userName = 'User Name', transId = '0817239419528913', balance = '4545', time = '9:12 AM' }) => {
    return (
        <FlatList
            data={[1, 2, 3, 4, 5]}
            removeClippedSubviews={false}
            ItemSeparatorComponent={() => <Spacer isBasic />}
            ListHeaderComponent={() => <MediumText style={styles.historyText}>Transaction History</MediumText>}
            renderItem={({ item }) => {
                return (
                    <RowWrapper>
                        <RowWrapperBasic>
                            <ButtonWithIcon iconName={'arrow-bottom-left-bold-outline'} iconType={'material-community'} buttonColor={colors.appButton5} iconColor={colors.appIcon10} />
                            <Wrapper style={{ marginLeft: width(3) }}>
                                <MediumText>{userName}</MediumText>
                                <RegularText color={colors.appTextColor18}>{transId}</RegularText>
                            </Wrapper>
                        </RowWrapperBasic>
                        <Wrapper>
                            <MediumText style={styles.transactionBalance}>{`+${balance}$`}</MediumText>
                            <RegularText style={styles.transactionTime}>{time}</RegularText>
                        </Wrapper>
                    </RowWrapper>
                )
            }}

        />
    )
}

export default TransactionList
const styles = StyleSheet.create({
    transactionTime: {
        color: colors.appTextColor18,
        fontSize: totalSize(1.7),
        marginHorizontal: 0
    },
    transactionBalance: {
        color: colors.appTextColor1,
        fontSize: totalSize(1.7)
    },
    historyText: {
        fontSize: totalSize(1.9),
        color: colors.appTextColor1,
        marginHorizontal: width(5),
        marginBottom: height(2)
    }
})