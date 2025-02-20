import React from 'react'
import { StyleSheet, } from 'react-native'
import { width } from 'react-native-dimension'
import { TextInputSearch, TinyTitle, Wrapper } from '../../../components'

const SearchbarSection = ({ onPress }) => {
    return (
        <Wrapper style={styles.wrapper}>
            <TinyTitle>Select pickup</TinyTitle>
            <Wrapper style={styles.space} />
            <TextInputSearch
                placeholder={'Enter pickup point'}
                editable={false}
                isButton
                onPress={onPress}
            />
        </Wrapper>
    )
}

export default SearchbarSection

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: width(5),
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: '5%',
    },
    space: {
        height: 12,
    }
})