import Toast from "react-native-toast-message";
import { fontFamily } from "../../constants";

const ToastError = (text) => {

    Toast.show({
        type: 'error',
        text1: 'Error',
        text2: text,
        text1Style: { fontSize: 14, marginBottom: 5 },
        text2Style: { color: 'black', fontSize: 14, fontFamily: fontFamily.appTextRegular },
        visibilityTime: 3000,
    });
}
const ToastSuccess = (message) => {
    Toast.show({
        type: 'success',
        text1: 'Success',
        text2: message,
        text1Style: { fontSize: 14, marginBottom: 5 },
        text2Style: { color: 'black', fontSize: 14, fontFamily: fontFamily.appTextMedium },
        visibilityTime: 3000
    });
}
const ToastInfo = (message) => {

    Toast.show({
        type: 'info',
        text1: 'Info',
        text2: message,
        visibilityTime: 3000
    });
}

export { ToastError, ToastSuccess, ToastInfo }