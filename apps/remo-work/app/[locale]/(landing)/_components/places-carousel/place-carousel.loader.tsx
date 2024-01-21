import { Carousel, CarouselSlide } from '@mantine/carousel';
import {
  Button,
  Card,
  CardSection,
  Container,
  Group,
  Skeleton,
  Text,
  Title,
  rem,
} from '@mantine/core';

export const PlacesCarouselLoader = async () => {
  return (
    <Container size="lg" py="xl">
      <Title order={2} ta="center" mt="sm">
        <Skeleton h="24px" />
      </Title>

      <Text ta="center" mt="md" maw={rem(600)} m="auto">
        <Skeleton h="24px" />
      </Text>

      <Carousel
        slideSize={{ base: '100%', sm: '33.333%' }}
        slideGap={{ base: 'xl', sm: 'md' }}
        align="start"
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
        {[1, 2, 3]?.map((props) => (
          <CarouselSlide key={props}>
            <Card withBorder radius="md" p="md" bg="secondary.2">
              <Skeleton height={350} />

              <CardSection p="md">
                <Group gap={0}>
                  <Group justify="apart">
                    <Skeleton w="64px" h="24px" />
                  </Group>
                  <Skeleton w="64px" h="24px" py="sm" />
                  <Group gap={6} mt="sm">
                    {[1, 2, 3, 5, 6].map((key) => (
                      <Skeleton w="64px" h="24px" key={key} />
                    ))}
                  </Group>
                </Group>
              </CardSection>

              <Group mt="xs">
                <Button
                  radius="md"
                  style={{ flex: 1 }}
                  disabled={true}
                ></Button>
              </Group>
            </Card>
          </CarouselSlide>
        ))}
      </Carousel>
    </Container>
  );
};
