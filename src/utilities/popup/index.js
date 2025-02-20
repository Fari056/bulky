import Toast from "react-native-toast-message";

const ToastError = (text) => {

    Toast.show({
        type: 'error',
        text1: 'Error',
        text2: text,
        visibilityTime: 3000,
    });
}
const ToastSuccess = (message) => {
    Toast.show({
        type: 'success',
        text1: 'Success',
        text2: message,
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