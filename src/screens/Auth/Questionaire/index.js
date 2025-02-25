import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native'
import React from 'react'
import { ButtonBorderd, ButtonColored, ComponentWrapper, MainWrapper, PrimaryImage, Spacer, TinyTitle, Wrapper } from '../../../components'
import { SCREEN, colors } from '../../../constants'
import { useSelector } from 'react-redux'
import { Image } from '../../../core_ui'
import { Images } from '../../../utilities'
import { height, width } from 'react-native-dimension'
import LinearGradient from 'react-native-linear-gradient'


const Questionaire = ({ navigation }) => {
    const { navigate } = navigation
    // const account_redux = useSelector(state => state?.account_type)

    const Footer = () => (
        <Wrapper style={styles.footer}>
            {/* <ButtonColored text='SIGN UP' onPress={() => navigate(SCREEN?.signUp)} /> */}
            <ButtonColored text='SIGN UP' onPress={() => navigate(SCREEN?.accountType)} />
            <Spacer isSmall />
            <ButtonBorderd text='SIGN IN ' onPress={() => navigate(SCREEN.signIn)} />
        </Wrapper>
    )

    const Gradient = () => (
        <LinearGradient style={styles.gradient} colors={colors.gradiant5}>
            <PrimaryImage source={Images.logo} />
            <PrimaryImage styles={styles.slogan} source={Images.slogan} />
        </LinearGradient>
    )

    return (
        <MainWrapper>
            <ComponentWrapper>
                <Gradient />
                <Image resizeMode={'contain'}
                    style={styles.image}
                    src={Images.welcome} />
                <TinyTitle style={styles.text}>Bulky is your on-time delivery provider for TVs, furniture, appliances, construction materials, and more!</TinyTitle>
            </ComponentWrapper>
            <Footer />
        </MainWrapper>
    )
}

export default Questionaire

const styles = StyleSheet.create({
    image: {
        height: height(63),
        width: '100%',
        // position: 'absolute',
    },
    footer: {
        position: 'absolute',
        bottom: height(2),
        right: width(5),
        left: width(5),
        height: height(15),
        justifyContent: 'flex-end'
    },
    text: {
        textAlign: 'center',
        marginBottom: 8,
    },
    gradient: {
        height: height(57),
        zIndex: 10000,
        position: 'absolute',
        top: height(10),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: height(7)
    },
    slogan: {
        width: width(55),
        height: height(6),
        marginTop: -height(2)
    },
})