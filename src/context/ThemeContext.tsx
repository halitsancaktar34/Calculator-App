import React, {useState, createContext, ReactNode} from 'react';

type ThemeContextType = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  calculations: string[];
  setCalculations: React.Dispatch<React.SetStateAction<[]>>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const Provider = ({children}: {children: ReactNode}) => {
  const [theme, setTheme] = useState<string>('dark');
  const [calculations, setCalculations] = useState<[]>([]);
  return (
    <ThemeContext.Provider
      value={{theme, setTheme, calculations, setCalculations}}>
      {children}
    </ThemeContext.Provider>
  );
};

export {ThemeContext};
export default Provider;
