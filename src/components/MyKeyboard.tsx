import react, {useContext, useState} from 'react';
import Button from './Button';
import {View, Text} from 'react-native';
import {Styles} from '../styles/GlobalStyles';
import {myColors} from '../styles/Colors';
import {ThemeContext} from '../context/ThemeContext';

type ThemeContextType = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  calculations: string[];
  setCalculations: React.Dispatch<React.SetStateAction<[]>>;
};

export default function MyKeyboard() {
  const themeContext = useContext<ThemeContextType | undefined>(ThemeContext);

  if (!themeContext) {
    throw new Error('CalculationsScreen must be used within a ThemeProvider');
  }

  const {calculations, setCalculations} = themeContext;

  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState<Number | null>(null);

  const handleNumberPress = (buttonValue: string) => {
    if (firstNumber.length < 10) {
      setFirstNumber(firstNumber + buttonValue);
    }
  };

  const handleOperationPress = (buttonValue: string) => {
    setOperation(buttonValue);
    setSecondNumber(firstNumber);
    setFirstNumber('');
  };

  const clear = () => {
    setFirstNumber('');
    setSecondNumber('');
    setOperation('');
    setResult(null);
  };

  const saveResult = () => {
    const stringResult = JSON.stringify(
      firstNumber + operation + secondNumber + '=' + result,
    );
    console.log(stringResult);
  };

  const firstNumberDisplay = () => {
    if (result !== null) {
      return (
        <Text
          style={
            result < 99999
              ? [Styles.screenFirstNumber, {color: myColors.result}]
              : [
                  Styles.screenFirstNumber,
                  {fontSize: 50, color: myColors.result},
                ]
          }>
          {result?.toString()}
        </Text>
      );
    }
    if (firstNumber && firstNumber.length < 6) {
      return <Text style={Styles.screenFirstNumber}>{firstNumber}</Text>;
    }
    if (firstNumber === '') {
      return <Text style={Styles.screenFirstNumber}>{'0'}</Text>;
    }
    if (firstNumber.length > 5 && firstNumber.length < 8) {
      return (
        <Text style={[Styles.screenFirstNumber, {fontSize: 70}]}>
          {firstNumber}
        </Text>
      );
    }
    if (firstNumber.length > 7) {
      return (
        <Text style={[Styles.screenFirstNumber, {fontSize: 50}]}>
          {firstNumber}
        </Text>
      );
    }
  };

  const getResult = () => {
    let num1 = parseInt(firstNumber);
    let num2 = parseInt(secondNumber);
    let calcResult = 0;
    
    switch (operation) {
      case '+':
        clear();
        calcResult = num1 + num2;
        break;
      case '-':
        clear();
        calcResult = num2 - num1;
        break;
      case '*':
        clear();
        calcResult = num1 * num2;
        break;
      case '/':
        clear();
        calcResult = num2 / num1;
        break;
      default:
        clear();
        calcResult = 0;
        break;
    }
    setResult(calcResult);
    let newCalculation;
    if (operation === '-' || '/') {
       newCalculation = {
        firstNumber: secondNumber,
        operation: operation,
        secondNumber: firstNumber,
        result: calcResult,
      };
    } else {
       newCalculation = {
        firstNumber: firstNumber,
        operation: operation,
        secondNumber: secondNumber,
        result: calcResult,
      };
    }

    setCalculations([...calculations, newCalculation]);
    console.log(calculations);
  };

  return (
    <View style={Styles.viewBottom}>
      <View
        style={{
          height: 120,
          width: '90%',
          justifyContent: 'flex-end',
          alignSelf: 'center',
        }}>
        <Text style={Styles.screenSecondNumber}>
          {secondNumber}
          <Text style={{color: 'purple', fontSize: 50, fontWeight: '500'}}>
            {operation}
          </Text>
        </Text>
        {firstNumberDisplay()}
      </View>
      <View style={Styles.row}>
        <Button title="C" isGray onPress={clear} />
        <Button
          title="+/-"
          isGray
          onPress={() => handleOperationPress('+/-')}
        />
        <Button title="％" isGray onPress={() => handleOperationPress('％')} />
        <Button title="÷" isOrange onPress={() => handleOperationPress('/')} />
      </View>
      <View style={Styles.row}>
        <Button title="7" onPress={() => handleNumberPress('7')} />
        <Button title="8" onPress={() => handleNumberPress('8')} />
        <Button title="9" onPress={() => handleNumberPress('9')} />
        <Button title="×" isOrange onPress={() => handleOperationPress('*')} />
      </View>
      <View style={Styles.row}>
        <Button title="4" onPress={() => handleNumberPress('4')} />
        <Button title="5" onPress={() => handleNumberPress('5')} />
        <Button title="6" onPress={() => handleNumberPress('6')} />
        <Button title="-" isOrange onPress={() => handleOperationPress('-')} />
      </View>
      <View style={Styles.row}>
        <Button title="1" onPress={() => handleNumberPress('1')} />
        <Button title="2" onPress={() => handleNumberPress('2')} />
        <Button title="3" onPress={() => handleNumberPress('3')} />
        <Button title="+" isOrange onPress={() => handleOperationPress('+')} />
      </View>
      <View style={Styles.row}>
        <Button title="." onPress={() => handleNumberPress('.')} />
        <Button title="0" onPress={() => handleNumberPress('0')} />
        <Button
          title="⌫"
          onPress={() => setFirstNumber(firstNumber.slice(0, -1))}
        />
        <Button title="=" isOrange onPress={() => getResult()} />
      </View>
    </View>
  );
}
