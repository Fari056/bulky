import { PermissionsAndroid, Platform, } from "react-native";
import ImageCropPicker from "react-native-image-crop-picker";
import { SCREEN } from "../../constants/screens";
// import { Customers, Drafts, Messages, More, Projects } from "../../../assets/svg";
import moment from "moment";
import { getDistance } from 'geolib';

export const takePhotoFromCamera = async () => {
    let img = false
    if (cameraPermission) {
        try {
            await ImageCropPicker.openCamera({
                compressImageMaxHeight: 1080,
                compressImageMaxWidth: 1080,
                cropping: true,
            }).then(image => { img = image })

        } catch (e) {
            img = false
            console.log(e)
        }
    } else { img = false }
    return img
}
export const PickPhotoFromGallery = async () => {
    let img = false
    try {
        await ImageCropPicker.openPicker({
            compressImageMaxWidth: 1080,
            compressImageMaxHeight: 1080,
            cropping: true,
        }).then(image => { img = image })
    } catch (e) {
        img = false
        console.log(e)
    }
    return img
}
export const cameraPermission = async () => {
    let permission = true
    try {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "FSG Camera Permission",
                    message: "FSG needs access to your camera",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
                permission = true
            } else {
                permission = false
            }
        }
        else {
            permission = true
        }
    } catch (err) {
        console.warn(err);
        permission = false
    }
    return permission
};

export const FormatedDate = (objectDate) => {
    let day = objectDate.getDate();
    let month = objectDate.getMonth();
    let year = objectDate.getFullYear();
    return `${day}/${month + 1}/${year}`
}

// export const TabIcons = (key, color, size) => {
//     switch (key) {
//         case SCREEN.homeStack:
//             return <Drafts color={color} height={size} width={size} />
//         case SCREEN.customersStack:
//             return <Customers color={color} height={size} width={size} />
//         case SCREEN.projectStack:
//             return <Projects color={color} height={size} width={size} />
//         case SCREEN.messageStack:
//             return <Messages color={color} height={size} width={size} />
//         case SCREEN.moreStack:
//             return <More color={color} height={size} width={size} />

//         default:
//             return <More color={color} height={size} width={size} />
//     }
// }

export const FormatDate = (date) => {
    return moment(date).format('DD/MM/YYYY')
}

export const calculateDistanceInKm = (pickup, destination) => {
    if (!pickup?.latitude || !destination?.latitude) {
        return 'N/A';
    }
    const distanceInMeters = getDistance(
        { latitude: pickup?.latitude, longitude: pickup?.longitude },
        { latitude: destination?.latitude, longitude: destination?.longitude }
    );

    return `${(distanceInMeters / 1000)?.toFixed(1)} km`;
};