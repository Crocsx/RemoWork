import { Carousel } from '@mantine/carousel';
import { Badge, Flex, Grid, Text, Title, rem } from '@mantine/core';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useTranslations } from 'next-intl';

import { useMarkerStyles } from '~workspace/lib/feature/map';
import { Image } from '~workspace/lib/shared/ui';

import DisplayOpeningHours from './opening-hours';

export const PlacePreview = ({
  place,
}: {
  place: google.maps.places.PlaceResult;
}) => {
  const t = useTranslations();
  const markerStyle = useMarkerStyles({});

  if (!place.geometry?.location) return null;

  return (
    <Grid px={0} py="md">
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Carousel
          loop
          withIndicators
          height={rem(240)}
          dragFree
          slideGap="md"
          align="start"
        >
          {[
            ...(place.photos?.slice(0, 3).map((photo) =>
              photo.getUrl({
                maxHeight: 640,
                maxWidth: 360,
              })
            ) || 'https://placehold.co/640x360'),
          ].map((image, i) => (
            <Carousel.Slide key={i}>
              <Image fill src={image} alt="place illustration"></Image>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Flex display="flex" direction="column" style={{ flexGrow: 1 }}>
          <Title order={5}>
            {place.name}
            {place.types?.map((type) => (
              <Badge key={type}>{t('shared.enum.placeTypes', { type })}</Badge>
            ))}
          </Title>
          <Text fz="xs">{place.formatted_address}</Text>
          <DisplayOpeningHours openingHours={place.opening_hours} />
        </Flex>
      </Grid.Col>
      <Grid.Col span={{ base: 12 }}>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: rem(240) }}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            zoomControl: false,
            fullscreenControl: false,
            clickableIcons: false,
            draggable: false,
            scrollwheel: false,
            disableDoubleClickZoom: true,
          }}
          center={place.geometry?.location}
          zoom={15}
        >
          <Marker {...markerStyle} position={place.geometry.location} />
        </GoogleMap>
      </Grid.Col>
    </Grid>
  );
};
