// App.js

import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store'
import AppNavigator from './AppNavigation';// Your stack navigator


export default function App() {

  





  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
