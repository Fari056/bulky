import React, { useEffect } from 'react'
import { LogBox } from 'react-native'
import Routes from './src/routes'
import store from './src/redux'
import { Provider } from 'react-redux';
import { enableScreens } from "react-native-screens";
import 'react-native-get-random-values';

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