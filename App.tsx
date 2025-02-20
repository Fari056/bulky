import React, { useEffect } from 'react'
import { LogBox } from 'react-native'
import Routes from './src/routes'
import store from './src/redux'
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { enableScreens } from "react-native-screens";
enableScreens();
const App = () => {
  LogBox.ignoreAllLogs()
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
    // <Toast
    //   position='bottom'
    //   bottomOffset={40} />
  )
}

export default App