import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import Home from '../screens/Home';
import History from '../screens/History';
import {NavigationContainer} from '@react-navigation/native';
import {useContext} from 'react';
import {ThemeContext} from '../context/ThemeContext';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {myColors} from '../styles/Colors';
import {Styles} from '../styles/GlobalStyles';

const Drawer = createDrawerNavigator();

type ThemeContextType = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  calculations: string[];
  setCalculations: React.Dispatch<React.SetStateAction<[]>>;
};


function rootNavigator() {
  const themeContext = useContext<ThemeContextType | undefined>(ThemeContext);

  if (!themeContext) {
    throw new Error('DrawerNavigator must be used within a ThemeProvider');
  }

  const {theme, setTheme} = themeContext;

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
        }}
        drawerContent={props => {
          return (
            <DrawerContentScrollView
              {...props}
              contentContainerStyle={[
                styles.drawerContent,
                {backgroundColor: theme === 'dark' ? '#333333' : '#FFFFFF'},
              ]}>
              <View style={styles.header}>
                <Text
                  style={[
                    styles.headerText,
                    {color: theme === 'dark' ? myColors.light : myColors.black},
                  ]}>
                  Calculator
                </Text>
                <TouchableOpacity
                  style={[
                    styles.themeSwitch,
                    {backgroundColor: theme === 'dark' ? '#FFFFFF' : '#333333'},
                  ]}
                  onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                  <Text style={styles.themeSwitchText}>
                    {theme === 'dark' ? '☀️' : '🌙'}
                  </Text>
                </TouchableOpacity>
              </View>
              <DrawerItem
                label="Home"
                onPress={() => props.navigation.navigate('Home')}
                style={styles.drawerItem}
                labelStyle={[
                  styles.drawerItemLabel,
                  {color: theme === 'dark' ? myColors.light : myColors.black},
                ]}
              />
              <DrawerItem
                label="History"
                onPress={() => props.navigation.navigate('History')}
                style={styles.drawerItem}
                labelStyle={[
                  styles.drawerItemLabel,
                  {color: theme === 'dark' ? myColors.light : myColors.black},
                ]}
              />
            </DrawerContentScrollView>
          );
        }}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="History" component={History} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  themeSwitch: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeSwitchText: {
    fontSize: 20,
  },
  drawerItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginBottom: 10,
  },
  drawerItemLabel: {
    fontSize: 20,
    marginLeft: 20,
  },
});

export default rootNavigator;
