import { useEffect, useState } from 'react';

import { Flex, Group, Text, Anchor, Button } from '@mantine/core';
import { Badge } from '@mantine/core';
import { IconPin } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { Place, PlaceUtils } from '~workspace/lib/feature/place';
import { Image } from '~workspace/lib/shared/ui';

import { PlaceIcons } from './place-icons';
import { PlaceOpeningTime } from './place-opening-time';

export const PlaceDescription = ({
  place,
  service,
  goToHandler,
}: {
  place: Place;
  service?: google.maps.places.PlacesService;
  goToHandler?: (place: Place) => void;
}) => {
  const t = useTranslations();
  const [details, setDetails] = useState<{
    url?: string;
    openingHours?: google.maps.places.PlaceOpeningHours;
  }>();

  useEffect(() => {
    const cache = PlaceUtils.cache[place.id];
    if (cache) {
      setDetails({
        url: cache?.url,
        openingHours: cache?.opening_hours,
      });
    } else {
      service?.getDetails(
        { placeId: place.id, fields: ['url', 'opening_hours'] },
        (detail) => {
          PlaceUtils.addPlace(place.id, detail);
          setDetails({
            url: detail?.url,
            openingHours: detail?.opening_hours,
          });
        }
      );
    }
  }, [service, place.id]);

  return (
    <Flex direction="column">
      <Group h={180} pos="relative">
        <Image src={place.illustration} alt={place.name} fill />
      </Group>
      <Flex>
        {details && (
          <Flex direction="column" style={{ flex: 1 }} miw={0}>
            <Text fz="lg" truncate="end">
              {place.name}
              {typeof details.openingHours?.isOpen() === 'boolean' && (
                <Badge c={details.openingHours?.isOpen() ? 'green' : 'red'}>
                  {t('shared.enum.open', {
                    open: details.openingHours?.isOpen()?.toString(),
                  })}
                </Badge>
              )}
            </Text>
            <PlaceOpeningTime openingHours={details.openingHours} />
            <PlaceIcons place={place} />
            {details.url && (
              <Anchor fz="xs" href={details?.url} target="_blank">
                {t('core.page.map.module.place.viewer.button.openOnGoogleMap')}
              </Anchor>
            )}
          </Flex>
        )}
        {goToHandler && (
          <Group>
            <Button onClick={() => goToHandler(place)}>
              <IconPin />
            </Button>
          </Group>
        )}
      </Flex>
    </Flex>
  );
};
