import { Carousel, CarouselSlide } from '@mantine/carousel';
import { Container, Title, Text, rem } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { Place, ReadPlacesRequest } from '~workspace/lib/feature/place';
import { createQueryString } from '~workspace/lib/shared/utils';

import { PlaceCarouselCard } from './place-carousel-card';

export const PlacesCarousel = async () => {
  const t = useTranslations();
  const params = createQueryString<ReadPlacesRequest>({
    filters: {},
    sortBy: {
      field: 'createdAt',
      dir: 'asc',
    },
    perPage: 5,
  });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/places?${params}`
  );
  const places: Place[] = await res.json();

  return (
    <Container size="xl" py="xl">
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
