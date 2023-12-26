import { Image as MantineImage } from '@mantine/core';
import NextImage from 'next/image';

export const Image = ({
  src,
  ...rest
}: Omit<React.ComponentProps<typeof NextImage>, 'src' | 'alt'> & {
  src?: string | null;
  alt: string;
}) =>
  src ? (
    <MantineImage component={NextImage} src={src} {...rest} />
  ) : (
    <MantineImage
      component={NextImage}
      src={`https://placehold.co/${rest.width}x${rest.height}`}
      {...rest}
    />
  );
