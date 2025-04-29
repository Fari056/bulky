import React, { useRef, useState } from 'react'
import { FlatList, StatusBar, useWindowDimensions, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { OnBoarding } from '../../../../tempData'
import { AbsoluteWrapper, ImageBackgroundWrapper, MainWrapper, RegularText, SmallTitle } from '../../../components'
// import { OnBoardingWrapper } from '../../../components/appComponents/generalComponents'
import { AbsoluteButton } from '../../../components/appComponents/staticComponents'
import { colors, SCREEN } from '../../../constants'
import { styles } from './styles'
import { StackActions } from '@react-navigation/native'


const OnBoardings = ({ navigation }) => {
    const { replace } = navigation
    const ref = useRef();
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [activeDotIndex, setActiveDotIndex] = useState(0);
    const { width } = useWindowDimensions();

    const updateCurrentSlideIndex = e => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
    };

    const updateDotIndex = e => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setActiveDotIndex(currentIndex)
        setCurrentSlideIndex(currentIndex);
    };

    const HandlePressContinue = (index) => {
        if (currentSlideIndex <= 1) {
            setCurrentSlideIndex(currentSlideIndex + 1);
            ref.current.scrollToIndex({ animated: true, index: currentSlideIndex + 1 });
            setActiveDotIndex(activeDotIndex + 1)
        } else {
            navigation.navigate(SCREEN.questionaire);
        }
    };

    return (
        <MainWrapper>
            <StatusBar backgroundColor={'transparent'} barStyle={'light-content'} />
            <FlatList
                ref={ref}
                data={OnBoarding}
                onMomentumScrollBegin={updateCurrentSlideIndex}
                onMomentumScrollEnd={updateDotIndex}
                showsHorizontalScrollIndicator={false}
                horizontal
                pagingEnabled
                removeClippedSubviews={false}
                renderItem={({ item }) => {
                    return (
                        <OnBoardingWrapper uri={item?.uri} title={item?.title} description={item?.description} skip={activeDotIndex != 2 && 'Skip'} onPressSkip={() => navigation.navigate(SCREEN.questionaire)} />
                    )
                }}
            />
            <Indicators currentSlideIndex={currentSlideIndex} />
            <AbsoluteButton title={'NEXT'} onPress={HandlePressContinue} />
        </MainWrapper>

    )
}

export default OnBoardings

export const OnBoardingWrapper = ({ uri, skip, onPressSkip, title, description }) => {
    return (
        <ImageBackgroundWrapper resizeMode='cover' source={uri} >
            <LinearGradient colors={colors.gradiant1} style={styles.gradientWrapper}>
                <RegularText onPress={onPressSkip} style={styles.skipText}>{skip}</RegularText>
                <SmallTitle style={styles.title}>{title}</SmallTitle>
                <RegularText style={styles.description}>{description}</RegularText>
            </LinearGradient>
        </ImageBackgroundWrapper>
    )
}

// ONBOARDING INDICATORS
export const Indicators = ({ currentSlideIndex }) => {
    return (
        <AbsoluteWrapper style={styles.indicatorContainer}>
            {[1, 2, 3]?.map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.indicator,
                        currentSlideIndex == index && styles.selectedIndicator,
                    ]}
                />
            ))}
        </AbsoluteWrapper>
    );
};
