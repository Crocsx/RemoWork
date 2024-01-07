import { Flex, Group, Image as MantineImage } from '@mantine/core';
import { IconPhotoOff } from '@tabler/icons-react';
import NextImage from 'next/image';

import { isValidUrl } from '~workspace/lib/shared/utils';

export const Image = ({
  src,
  ...rest
}: Omit<React.ComponentProps<typeof NextImage>, 'src' | 'alt'> & {
  src?: string | null;
  alt: string;
}) => {
  return isValidUrl(src) ? (
    <MantineImage component={NextImage} src={src} {...rest} />
  ) : (
    <Group w={rest?.width || rest.sizes} h={'100%'} bg="primary.1">
      <Flex flex="1" justify="center" align="center">
        <IconPhotoOff size={32} stroke="var(--mantine-color-primary-9)" />
      </Flex>
    </Group>
  );
};
