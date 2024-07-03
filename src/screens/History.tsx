import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {Trash} from 'iconsax-react-native';

type ThemeContextType = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  calculations: string[];
  setCalculations: React.Dispatch<React.SetStateAction<[]>>;
};

const History = () => {
  const themeContext = useContext<ThemeContextType | undefined>(ThemeContext);

  if (!themeContext) {
    throw new Error('CalculationsScreen must be used within a ThemeProvider');
  }

  const {theme, calculations, setCalculations} = themeContext;

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: theme === 'dark' ? '#333' : '#f5f5f5'},
      ]}>
      <View style={{padding: 20}}>
        <View
          style={{
            borderBottomWidth: 3,
            borderBottomColor: '#CCCCCC',
            marginBottom: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: theme === 'dark' ? '#fff' : '#333',
              fontSize: 34,
              marginBottom: 10,
            }}>
            Recent Calculations
          </Text>
          <TouchableOpacity
            style={{paddingBottom: 10, paddingRight: 3}}
            onPress={() => setCalculations([])}>
            <Trash size="32" color="#f47373" variant="Bold" />
          </TouchableOpacity>
        </View>
        {calculations.map((calculation, index) => (
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#CCCCCC',
              marginBottom: 10,
            }}
            key={index}>
            <Text
              style={{
                color: theme === 'dark' ? '#fff' : '#333',
                fontSize: 18,
                marginTop: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#CCCCCC',
                marginBottom: 10,
              }}>
              {calculation.firstNumber} {calculation.operation}{' '}
              {calculation.secondNumber} = {calculation.result}
            </Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 200,
  },
});

export default History;
