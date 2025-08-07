import { useColorScheme } from 'react-native';

export const useThemeColors = () => {
  const isDark = useColorScheme() === 'dark';

  return {
    background: isDark ? '#121212' : '#fff',
    text: isDark ? '#fff' : '#000',
    card: isDark ? '#1c1c1c' : '#f9f9f9',
    danger: '#ff4c4c',
    success: '#00ff99',
  };
};
