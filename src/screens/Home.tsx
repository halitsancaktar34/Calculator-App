import {View, Text, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import React, {useContext} from 'react';
import MyKeyboard from '../components/MyKeyboard';
import {myColors} from '../styles/Colors';
import {ThemeContext} from '../context/ThemeContext';
type ThemeContextType = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

const Home = () => {
  const themeContext = useContext<ThemeContextType | undefined>(ThemeContext);

  if (!themeContext) {
    throw new Error('DrawerNavigator must be used within a ThemeProvider');
  }

  const {theme, setTheme} = themeContext;
  return (
    <SafeAreaView style={theme === 'light' ? styles.container : [styles.container, {backgroundColor: 'black'}]}>
      <MyKeyboard />
    </SafeAreaView>
  );
};

export default Home;

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
