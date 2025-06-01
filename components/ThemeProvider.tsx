import React, { ReactNode, useMemo } from 'react';
import { Provider as PaperProvider, DefaultTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
  regular: {
    fontFamily: "Inter, 'Segoe UI', Arial, sans-serif",
    fontWeight: '400' as '400',
    fontSize: 16,
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  medium: {
    fontFamily: "Inter, 'Segoe UI', Arial, sans-serif",
    fontWeight: '500' as '500',
    fontSize: 16,
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  light: {
    fontFamily: "Inter, 'Segoe UI', Arial, sans-serif",
    fontWeight: '300' as '300',
    fontSize: 16,
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  thin: {
    fontFamily: "Inter, 'Segoe UI', Arial, sans-serif",
    fontWeight: '200' as '200',
    fontSize: 16,
    letterSpacing: 0.5,
    lineHeight: 24,
  },
};

const customTheme = {
  ...DefaultTheme,
  roundness: 8,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1976D2',
    accent: '#FF4081',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#212121',
    disabled: '#BDBDBD',
    placeholder: '#757575',
    notification: '#FF4081',
    secondary: '#424242',
    navBar: '#263238',
    sidePanel: '#ECEFF1',
    inspectorPanel: '#FAFAFA',
  } as typeof DefaultTheme.colors & {
    secondary: string;
    navBar: string;
    sidePanel: string;
    inspectorPanel: string;
    disabled: string;
  },
  fonts: configureFonts({
    web: fontConfig,
    ios: fontConfig,
    android: fontConfig,
    default: fontConfig,
  }),
};

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = useMemo(() => customTheme, []);

  return (
    <PaperProvider theme={theme}>
      {children}
    </PaperProvider>
  );
};

export default ThemeProvider;
