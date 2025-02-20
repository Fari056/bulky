import React , {useState}from 'react'
import { ComponentWrapper, MainHeader, MainWrapper } from '../../../components'
import { AbsoluteButton, DeleteAccountInfo } from '../../../components/appComponents/staticComponents'
import { SCREEN } from '../../../constants'
import { deleteAccount_ } from '../../../backend/auth'
import { err } from 'react-native-svg/lib/typescript/xml'
import { ToastError, ToastSuccess } from '../../../utilities'
const DeleteAccount = ({ navigation }) => {
    const { navigate } = navigation
     const [password, setPassword] = useState("");
const delte = async () => {
  if (!password) {
    ToastError("Password is required");
    return;
  }
  const result = await deleteAccount_(password);
  if (result.success) {
    ToastSuccess(result.message)
    navigate(SCREEN?.verifyDeleteAccount)
  } else {
    ToastError(result.message)
    console.log(result.message);
  }
};

    return (
      <MainWrapper>
        <ComponentWrapper>
          <MainHeader title={"Delete My Account"} />
          <DeleteAccountInfo
            password={password}
            onChangePassword={setPassword}
          />
        </ComponentWrapper>
        <AbsoluteButton
          title={"DELETE MY ACCOUNT"}
          onPress={delte}
        />
        {/* <AbsoluteButton title={'DELETE MY ACCOUNT'} onPress={() => navigate(SCREEN?.verifyDeleteAccount)} /> */}
      </MainWrapper>
    );
}

export default DeleteAccount