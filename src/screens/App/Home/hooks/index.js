import { View, Text } from 'react-native'
import { SCREEN } from '../../../../constants'

export const useData = ({ navigate }) => {
    const OnManu = () => navigate(SCREEN.setting)
    const OnProfile = () => navigate(SCREEN.clientProfile)
    const OnPickUp = () => navigate(SCREEN.enterPickupPoint)

    return {
        OnManu,
        OnProfile,
        OnPickUp
    }
}

