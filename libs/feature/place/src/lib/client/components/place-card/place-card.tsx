import { useEffect, useState } from 'react';

import { Flex, Group, Anchor, Text, Button, rem, Badge } from '@mantine/core';
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
  const [details, setDetails] =
    useState<google.maps.places.PlaceResult | null>();
  useEffect(() => {
    const cache = PlaceUtils.cache[place.id];
    if (cache) {
      setDetails(cache);
    } else {
      service?.getDetails(
        { placeId: place.id, fields: ['url', 'opening_hours'] },
        (detail) => {
          PlaceUtils.addPlace(place.id, detail);
          setDetails(detail);
        }
      );
    }
  }, [service, place.id]);

  const hasOpenInfo =
    typeof details?.opening_hours?.isOpen() === 'boolean' ||
    typeof details?.opening_hours?.open_now === 'boolean';
  const isOpen =
    details?.opening_hours?.isOpen() || details?.opening_hours?.open_now;
  return (
    <Flex direction="column" style={{ flexGrow: 1 }}>
      <Group h={rem(180)} pos="relative">
        <Image src={place.illustration} alt={place.name} fill sizes="350px" />
      </Group>
      <Flex style={{ flexGrow: 1 }}>
        {details && (
          <Flex direction="column">
            <Group align="center">
              <Anchor
                component="button"
                onClick={onSelect}
                ta="start"
                display="flex"
                truncate="end"
                style={{ flex: 1 }}
              >
                <Text truncate="end">{place.name}</Text>
              </Anchor>
              {hasOpenInfo && (
                <Badge
                  color={isOpen ? 'green' : 'red'}
                  fz="xs"
                  size="sm"
                  variant="outline"
                  miw="fit-content"
                >
                  {t('shared.enum.open', {
                    open: isOpen?.toString(),
                  })}
                </Badge>
              )}
            </Group>
            <Group>
              <Flex direction="column" style={{ flex: 1 }} gap={'xs'}>
                <PlaceOpeningTime openingHours={details.opening_hours} />
                <PlaceIcons place={place} />
              </Flex>
              {goToHandler && (
                <Group>
                  <Button size="compact-md" onClick={() => goToHandler(place)}>
                    <IconPin />
                  </Button>
                </Group>
              )}
            </Group>
          </Flex>
        )}
      </Flex>
      {details?.url && (
        <Anchor
          ml="auto"
          fz="xs"
          href={details?.url}
          target="_blank"
          maw="fit-content"
        >
          {t('core.page.map.module.place.viewer.button.openOnGoogleMap')}
        </Anchor>
      )}
    </Flex>
  );
};
