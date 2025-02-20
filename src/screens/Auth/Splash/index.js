import { StyleSheet } from 'react-native'
import React from 'react'
import { MainWrapper, PrimaryImage, Wrapper } from '../../../components'
import * as Animatable from "react-native-animatable";
import { Images } from '../../../utilities';
import { width, height } from "react-native-dimension";

export const Splash = () => {
    return (
        <MainWrapper>
            <Wrapper style={styles.splashContainer}>
                <Animatable.View animation={"fadeInLeft"}>
                    <PrimaryImage source={Images.logo} />
                </Animatable.View>
                <Animatable.View animation={"bounceIn"} delay={1000}>
                    <PrimaryImage styles={styles.slogan} source={Images.slogan} />
                </Animatable.View>
            </Wrapper>
        </MainWrapper>
    )
}

export default Splash



const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    slogan: {
        width: width(60),
        height: height(6),
        marginTop: -height(2),
    },
})