import React, { useState } from 'react'
import Validations from '../../utilities/validations'
import { useDispatch, useSelector } from 'react-redux'
import { Logout, getCurrentUserId, signIn, signUp } from '../../backend/auth'
import { getData, saveData, uploadProfileImage } from '../../backend/utility'
import { SCREEN } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { logout, set_account_type, signin } from '../../redux/actions'

export const useAuth = () => {
    const { replace, navigate } = useNavigation()
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [phoneNumber, setPhone] = useState('')
    const [userName, setUserName] = useState('')
    const [profile, setProfile] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [location, setLocation] = useState('')
    const [loading, setLoading] = useState(false)
    const account_type_redux = useSelector(state => state?.account_type)

    const validations = () => {
        !email ? setEmailError('Please enter your email, it is a required field') : !Validations.validateEmail(email) ? setEmailError('Email format is invalid') : setEmailError('')
        !password ? setPasswordError('Please enter your password, it is a required field') : password.length < 8 ? setPasswordError('Password should be at least 8 characters long') : setPasswordError('')
        !confirmPassword ? setConfirmPasswordError('Enter Confirm password') : confirmPassword.length < 8 ? setConfirmPasswordError('Confirm password should be at least 8 characters long') : confirmPassword != password ? setConfirmPasswordError('Confirm Password doest not match with Password') : setConfirmPasswordError('')
        if (email && password.length >= 8 && Validations.validateEmail(email) && confirmPassword && Validations.validatePassword(password) && Validations.validatePassword(confirmPassword) && (password === confirmPassword)) {
            return true
        } else {
            return false
        }
    }
    const valid_login = () => {
        !email ? setEmailError('Please enter your email, it is a required field') : !Validations.validateEmail(email) ? setEmailError('Email format is invalid') : setEmailError('')
        !password ? setPasswordError('Please enter your password, it is a required field') : password.length < 8 ? setPasswordError('Password should be at least 8 characters long') : setPasswordError('')
        if (email && password.length >= 8 && Validations.validateEmail(email) && Validations.validatePassword(password)) {
            return true
        } else {
            return false
        }
    }

    const SignUpClient = async () => {
        if (validations()) {
            // console.log(account_type_redux)
            const USER = {
                email: email,
                type: account_type_redux,
                password: password,
                isActive: false
            }
            try {
                setLoading(true)
                let uid = await signUp(USER)
                if (uid) {
                    delete USER.password
                    let saved = await saveData('users', uid, USER)
                    if (saved) {
                        navigate(SCREEN?.signIn)
                    }
                    setLoading(false)
                }
                setLoading(false)
            } catch (error) {
                console.log('error', error)
                setLoading(false)
            }
        }
    }

    const LogInUser = async () => {
        if (valid_login()) {
            try {
                setLoading(true)
                let _user = await signIn(email.toLocaleLowerCase().trim(), password)
                if (_user.res) {
                    let data = await getData('users', _user.user)
                    console.log(data)
                    if (data) {
                        if (!data.isActive) {
                            replace(SCREEN.completeProfile)
                        }
                        else {
                            dispatch(set_account_type(data?.type))
                            dispatch(signin(data))
                            // replace(data?.type == 'client' ? SCREEN.appStack : SCREEN.driverStack)
                        }
                    }
                }
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log('err', error)
            }
        }
    }
const updateProfile = async (_uid, profile, updatedData) => {
  try {
    setLoading(true);
     let img = "";
    if (profile) {
      let imageName = `/${_uid}/profile/${profile.path.split("/").pop()}`;
      img = await uploadProfileImage(profile.path, imageName);
    }
   const dataToUpdate = { ...updatedData, photo: img };
    const res = await saveData("users", _uid, dataToUpdate);
    if (res) {
      const _res1 = await getData("users", _uid);
      return _res1;
    }
  } catch (error) {
    console.log("err", error);
    } finally {
    setLoading(false);
  }
};
const CompleteProfile = async () => {
  const _uid = await getCurrentUserId();
  const updatedData = {
    firstName,
    lastName,
    location,
    phone: phoneNumber,
    isActive: true,
  };
  const profileData = await updateProfile(_uid, profile, updatedData);
  if (profileData.type === "driver") {
    navigate(SCREEN.selectPaymentMethods, {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      location: profileData.location,
      phone: profileData.phone,
      isActive: profileData.isActive,
      photo: profileData.photo,
    });
  } else {
    dispatch(signin(profileData));
  }
};

    const LOGOUTAPP = async () => {
        dispatch(logout())
        await Logout()
    }
    return {
        loading,
        userName, setUserName,
        email, setEmail,
        emailError, setEmailError,
        password, setPassword,
        passwordError, setPasswordError,
        confirmPassword, setConfirmPassword,
        confirmPasswordError, setConfirmPasswordError,
        phoneNumber, setPhone,
        profile, setProfile,
        firstName, setFirstName,
        lastName, setLastName,
        location, setLocation,
        SignUpClient,
        LogInUser,
        CompleteProfile,
        LOGOUTAPP,
    }
}