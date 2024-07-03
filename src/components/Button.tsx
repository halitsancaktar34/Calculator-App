import { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Styles } from "../styles/GlobalStyles";

interface ButtonProps {
    onPress: () => void;
    title: string;
    isOrange?: boolean;
    isGray?: boolean;
}

type ThemeContextType = {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
  };

export default function Button({ title, onPress, isOrange, isGray }: ButtonProps) {
    const themeContext = useContext<ThemeContextType | undefined>(ThemeContext);

  if (!themeContext) {
    throw new Error('DrawerNavigator must be used within a ThemeProvider');
  }

  const {theme, setTheme} = themeContext;
    return (
        <TouchableOpacity 
            style={
                isOrange 
                ? Styles.btnOrange 
                : isGray 
                ? Styles.btnGray 
                : theme === "light" 
                ? Styles.btnLight 
                : Styles.btnDark
            } 
            onPress={onPress}>
            <Text 
               style={
                   isOrange 
                   ? Styles.smallTextLight
                   : theme === "dark" 
                   ? Styles.smallTextLight 
                   : Styles.smallTextDark 
                }
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}
