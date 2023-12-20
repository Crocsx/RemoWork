import { MantineColorsTuple, createTheme } from '@mantine/core';

const blue: MantineColorsTuple = [
  '#e8f4ff',
  '#d5e2fb',
  '#acc2f0',
  '#7fa0e4',
  '#5a84db',
  '#4272d5',
  '#3469d3',
  '#2558bc',
  '#1b4eaa',
  '#074397',
];

const green: MantineColorsTuple = [
  '#c2e0c2',
  '#a3d8a3',
  '#85cc85',
  '#66bf66',
  '#50b450',
  '#3ca53c',
  '#2c8f2c',
  '#1e7a1e',
  '#146514',
  '#0a500a',
];

const palette = {
  blue,
  green,
};

export const themeBlue = createTheme({
  colors: palette,
  primaryColor: 'blue',
});
