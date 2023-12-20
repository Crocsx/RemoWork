import { Flex } from '@mantine/core';

import { CenterControl } from './center-control';
import { ZoomControl } from './zoom-control';

export const Hud = ({ map }: { map: google.maps.Map }) => {
  return (
    <Flex
      pos="absolute"
      direction="column"
      bottom="0"
      right="0"
      gap="md"
      px="md"
      py="xl"
    >
      <CenterControl map={map} />
      <ZoomControl map={map} />
    </Flex>
  );
};
