import { useCallback } from 'react';

import { Button, Flex } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';

export const ZoomControl = ({ map }: { map: google.maps.Map }) => {
  const zoom = useCallback(
    (change: number) => {
      const zoom = map.getZoom() || 10;
      map.setZoom(zoom + change);
    },
    [map]
  );

  return (
    <Flex direction="column" gap="xs">
      <Button onClick={() => zoom(+1)}>
        <IconPlus />
      </Button>
      <Button onClick={() => zoom(-1)}>
        <IconMinus />
      </Button>
    </Flex>
  );
};
