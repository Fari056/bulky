import React, { useEffect } from 'react'
import { LogBox } from 'react-native'
import Routes from './src/routes'
import store from './src/redux'
import { Provider } from 'react-redux';
import { enableScreens } from "react-native-screens";
import 'react-native-get-random-values';
import { StripeProvider } from '@stripe/stripe-react-native';

enableScreens();
const App = () => {
  LogBox.ignoreAllLogs()
  return (
    <Provider store={store}>
      <StripeProvider
        merchantIdentifier='merchant.info.mintapp'
        publishableKey={'pk_test_51QU7NzHXn2HNJcrtQ1nWFHft21L54FQNjrWr4Il9HmDUaVGpWHXxM9ldODmCRfwjbW0LDfUgxuI00NingYSgsAt500w6ekzm5J'}>
        <Routes />
      </StripeProvider>
    </Provider>
    // <Toast
    //   position='bottom'
    //   bottomOffset={40} />
  )
}

export default App