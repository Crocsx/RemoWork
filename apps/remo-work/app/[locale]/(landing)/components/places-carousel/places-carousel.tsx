import { Carousel, CarouselSlide } from '@mantine/carousel';
import { Container, Title, Text, rem } from '@mantine/core';

import { PlaceCard } from './place-card';

const mockdata = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    title: 'Verudela Beach',
    country: 'Croatia',
    description:
      'Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.',
    badges: [
      { emoji: '☀️', label: 'Sunny weather' },
      { emoji: '🦓', label: 'Onsite zoo' },
      { emoji: '🌊', label: 'Sea' },
      { emoji: '🌲', label: 'Nature' },
      { emoji: '🤽', label: 'Water sports' },
    ],
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    title: 'Verudela Beach',
    country: 'Croatia',
    description:
      'Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.',
    badges: [
      { emoji: '☀️', label: 'Fast Wifi' },
      { emoji: '🦓', label: 'Onsite zoo' },
      { emoji: '🌊', label: 'Sea' },
      { emoji: '🌲', label: 'Nature' },
      { emoji: '🤽', label: 'Water sports' },
    ],
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    title: 'Verudela Beach',
    country: 'Croatia',
    description:
      'Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.',
    badges: [
      { emoji: '☀️', label: 'Sunny weather' },
      { emoji: '🦓', label: 'Onsite zoo' },
      { emoji: '🌊', label: 'Sea' },
      { emoji: '🌲', label: 'Nature' },
      { emoji: '🤽', label: 'Water sports' },
    ],
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    title: 'Verudela Beach',
    country: 'Croatia',
    description:
      'Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.',
    badges: [
      { emoji: '☀️', label: 'Sunny weather' },
      { emoji: '🦓', label: 'Onsite zoo' },
      { emoji: '🌊', label: 'Sea' },
      { emoji: '🌲', label: 'Nature' },
      { emoji: '🤽', label: 'Water sports' },
    ],
  },
];

export const PlacesCarousel = () => {
  return (
    <Container size="xl" py="xl">
      <Title order={2} ta="center" mt="sm">
        Latest place added
      </Title>

      <Text c="dimmed" ta="center" mt="md" maw={rem(600)} m="auto">
        Every once in a while, you’ll see a Golbat that’s missing some fangs.
        This happens when hunger drives it to try biting a Steel-type Pokémon.
      </Text>
      <Carousel
        slideSize={{ base: '100%', sm: '33.333%' }}
        slideGap={{ base: 'xl', sm: 'md' }}
        align="start"
        loop
        slidesToScroll={1}
        mt={50}
      >
        {mockdata.map((props) => (
          <CarouselSlide key={props.id}>
            <PlaceCard {...props} />
          </CarouselSlide>
        ))}
      </Carousel>
    </Container>
  );
};
