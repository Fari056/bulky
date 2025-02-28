import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ComponentWrapper, DueButtons, MainHeader, MainWrapper } from '../../../../../components'
import Bed from './items/bed'
import { useRequest } from '../../../../../hooks'
import Bike from './items/Bike'
import Boxes from './items/Boxes'

export const Products = ({ navigation, route }) => {
    const { goBack, na } = navigation
    const type = route.params?.type

    const {
        selectedBed, setSelectedBed,
        numBoxes, setNumBoxes,
        isBoxesOversized, setIsBoxesOversized
    } = useRequest()

    const handleContinue = () => {

    }

    return (
        <MainWrapper>
            <ComponentWrapper>
                <MainHeader title={"Item Details"} />
            </ComponentWrapper>
            {type == 'Bed' && <Bed
                item={{ title: type }}
                selectedOption={selectedBed}
                setSelectedOption={setSelectedBed}
            />}
            {type == 'Bike' && <Bike
                title={type}
            />}
            {type == 'Boxes' && <Boxes
                title={type}
                Text={numBoxes}
                setText={setNumBoxes}
                isOversized={isBoxesOversized}
                setIsOversized={setIsBoxesOversized}
            />}
            <DueButtons
                style={styles.dueButtons}
                onPress={handleContinue}
                text={"continue"}
                onBack={() => goBack()}
            />
        </MainWrapper>
    )
}

export default Products

const styles = StyleSheet.create({
    dueButtons: {
        position: 'absolute',
        paddingVertical: 12,
        bottom: 0,
        left: 0,
        right: 0,

    }
})