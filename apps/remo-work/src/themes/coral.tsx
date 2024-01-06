import { SVGProps } from 'react';

import {
  Fieldset,
  LoadingOverlay,
  MantineColorsTuple,
  Modal,
  createTheme,
} from '@mantine/core';

import { RemoWorkLogoIcon } from '~workspace/lib/shared/icons';

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
  defaultRadius: 'lg',
  cursorType: 'pointer',
  fontFamily: 'Open Sans, Roboto, "Helvetica Neue", sans-serif',
  fontFamilyMonospace:
    '"Fira Code", "Fira Mono", "Droid Sans Mono", "Courier New", monospace',
  headings: { fontFamily: 'Lato, "Segoe UI", "Helvetica Neue", sans-serif' },
  components: {
    Fieldset: Fieldset.extend({
      styles: {
        root: {
          borderRadius: 0,
          border: 0,
          background: 'transparent',
        },
      },
    }),
    LoadingOverlay: LoadingOverlay.extend({
      styles: {
        overlay: {
          background: 'var(--mantine-color-secondary-0)',
        },
      },
    }),
    Modal: Modal.extend({
      styles: {
        content: {
          background: 'var(--mantine-color-secondary-0)',
        },
        header: { background: 'var(--mantine-color-secondary-0)' },
        title: {
          fontSize: '1.25rem',
          fontWeight: 'bold',
        },
      },
    }),
  },
  other: {
    logo: (props: SVGProps<SVGSVGElement>) => (
      <RemoWorkLogoIcon fill={primary[7]} {...props} />
    ),
  },
});
