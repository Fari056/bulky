import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ComponentWrapper, DueButtons, MainHeader, MainWrapper } from '../../../../../components'
import Bed from './items/bed'
import { useRequest } from '../../../../../hooks'
import Bike from './items/Bike'
import Boxes from './items/Boxes'
import Boats from './items/Boats'
import Motorcycle from './items/Motorcycle'
import TV from './items/TV'
import Construction from './items/Construction'
import Appliances from './items/Appliances'

export const Products = ({ navigation, route }) => {
    const { goBack, navigate } = navigation
    const type = route.params?.type
    const item = route.params?.item
    const isEdit = route.params?.isEdit

    const {
        selectedBed, setSelectedBed,
        numBoxes, setNumBoxes,
        isBoxesOversized, setIsBoxesOversized,
        selectedBoatSize, setSelectedBoatSize,
        selectedMotorcycleType, setSelectedMotorcycleType,
        selectedTVSize, setSelectedTVSize,
        selectedConstruction, setSelectedConstruction,
        appliancesData, setAppliancesData,
        selectedAppliancesSizes, setSelectedAppliancesSizes,
        selectedAppliances, setSelectedAppliances,
        imageAppliancesUrls, setImageAppliancesUrls,
        handleContinue,
        data
    } = useRequest(type, navigate, item, isEdit)



    return (
        <MainWrapper>
            <ComponentWrapper>
                <MainHeader title={"Item Details"} />
            </ComponentWrapper>
            {type == 'Bed' && <Bed
                data={data.beds}
                title={type}
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
            {type == 'Boats' && <Boats
                title={type}
                selectedOption={selectedBoatSize}
                setSelectedOption={setSelectedBoatSize}
            />}
            {type == 'Motorcycle' && <Motorcycle
                title={type}
                selectedOption={selectedMotorcycleType}
                setSelectedOption={setSelectedMotorcycleType}
            />}
            {type == 'TV' && <TV
                title={type}
                selectedOption={selectedTVSize}
                setSelectedOption={setSelectedTVSize}
            />}
            {type == 'Construction' && <Construction
                title={type}
                selectedOption={selectedConstruction}
                setSelectedOption={setSelectedConstruction}
            />}
            {type == 'Appliances' && <Appliances
                title={type}
                data={appliancesData}
                setData={setAppliancesData}
                selectedSizes={selectedAppliancesSizes}
                setSelectedSizes={setSelectedAppliancesSizes}
                selected={selectedAppliances}
                setSelected={setSelectedAppliances}
                imageUrls={imageAppliancesUrls}
                setImageUrls={setImageAppliancesUrls}
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