import { MantineColorsTuple, createTheme } from '@mantine/core';

const primary: MantineColorsTuple = [
  '#FDECE9', // Lightest Primary
  '#FBD3C8', // Very Light Primary
  '#F8BAA7', // Lighter Primary
  '#F6A186', // Soft Primary
  '#F38765', // Desaturated Primary
  '#F16E44', // Pure Primary
  '#D9613D', // Moderate Primary
  '#C15436', // Dark Primary
  '#A9472F', // Deeper Primary
  '#913A28', // Darkest Primary
];

const secondary: MantineColorsTuple = [
  '#E3F2F1', // Lightest Secondary #b0ddd2
  '#C0E0DE', // Very Light Secondary
  '#9DCDCB', // Lighter Secondary
  '#7AB9B7', // Soft Secondary
  '#5796A4', // Desaturated Secondary
  '#347392', // Pure Secondary
  '#2C6178', // Moderate Secondary
  '#24505E', // Dark Secondary
  '#1D3F44', // Deeper Secondary
  '#162E2A', // Darkest Secondary
];

const palette = {
  primary,
  secondary,
};

export const themeCoral = createTheme({
  colors: palette,
  primaryColor: 'primary',
  defaultRadius: 'xl',
  cursorType: 'pointer',
  fontFamily: 'Arial, sans-serif',
  fontFamilyMonospace: 'Consolas, "Lucida Console", Monaco, monospace',
  headings: { fontFamily: 'Arial, sans-serif' },
});
