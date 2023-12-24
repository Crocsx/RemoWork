import { useEffect, useState } from 'react';

import { Flex, Group, Text, Anchor, Button, rem } from '@mantine/core';
import { IconPin } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { Place, PlaceUtils } from '~workspace/lib/feature/place';
import { Image } from '~workspace/lib/shared/ui';

import { PlaceIcons } from './place-icons';
import { PlaceOpeningTime } from './place-opening-time';

export const PlaceCard = ({
  place,
  service,
  goToHandler,
  onSelect,
}: {
  place: Place;
  service?: google.maps.places.PlacesService;
  goToHandler?: (place: Place) => void;
  onSelect?: () => void;
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
    <Flex direction="column" style={{ flexGrow: 1 }}>
      <Group h={rem(180)} pos="relative">
        <Image src={place.illustration} alt={place.name} fill sizes="350px" />
      </Group>
      <Flex style={{ flexGrow: 1 }}>
        {details && (
          <Flex direction="column" style={{ flex: 1 }} miw={0}>
            <Anchor component="button" onClick={onSelect} ta="start">
              <Text fz="lg" truncate="end">
                {place.name}
              </Text>
            </Anchor>
            <PlaceOpeningTime openingHours={details.openingHours} />
            <PlaceIcons place={place} />
            {details.url && (
              <Anchor
                fz="xs"
                href={details?.url}
                target="_blank"
                maw="fit-content"
              >
                {t('core.page.map.module.place.viewer.button.openOnGoogleMap')}
              </Anchor>
            )}
          </Flex>
        )}
        {goToHandler && (
          <Group>
            <Button size="compact-md" onClick={() => goToHandler(place)}>
              <IconPin />
            </Button>
          </Group>
        )}
      </Flex>
    </Flex>
  );
};
