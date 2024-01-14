import { Carousel, CarouselSlide } from '@mantine/carousel';
import { Container, Title, Text, rem } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { Place } from '~workspace/lib/feature/place';
import { FetchInstance } from '~workspace/lib/shared/utils';

import { PlaceCarouselCard } from './place-carousel-card';

export const PlacesCarousel = async () => {
  const t = await getTranslations();
  const places = await FetchInstance.get<Place[]>(`/places`, {
    filters: {},
    sortBy: {
      field: 'createdAt',
      dir: 'asc',
    },
    perPage: 5,
  });

  return (
    <Container size="lg" py="xl">
      <Title order={2} ta="center" mt="sm">
        {t('core.page.home.place.title')}
      </Title>

      <Text ta="center" mt="md" maw={rem(600)} m="auto">
        {t('core.page.home.place.description')}
      </Text>
      <Carousel
        slideSize={{ base: '100%', sm: '33.333%' }}
        slideGap={{ base: 'xl', sm: 'md' }}
        align="start"
        loop
        slidesToScroll={1}
        controlSize="32"
        mt={50}
        nextControlProps={{
          style: {
            background: 'var(--mantine-primary-color-5)',
          },
        }}
        previousControlProps={{
          style: {
            background: 'var(--mantine-primary-color-5)',
          },
        }}
      >
        {places?.map((props) => (
          <CarouselSlide key={props.id}>
            <PlaceCarouselCard {...props} />
          </CarouselSlide>
        ))}
      </Carousel>
    </Container>
  );
};
