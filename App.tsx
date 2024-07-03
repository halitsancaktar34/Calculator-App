import {useContext, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {myColors} from './src/styles/Colors';
import Provider, {ThemeContext} from './src/context/ThemeContext';
import 'react-native-gesture-handler';
import RootNavigator from './src/router/rootNavigator';

export default function App() {
  return (
    <Provider>
      <RootNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
  },
  switchContainer: {
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderWidth: 2,
    borderColor: myColors.btnGray,
  },
  light: {
    backgroundColor: '#f5f5f5',
  },
  dark: {
    backgroundColor: '#333',
  },
  switchText: {
    fontSize: 34,
  },
});
