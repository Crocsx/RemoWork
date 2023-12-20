import {
  Badge,
  Group,
  Title,
  Text,
  SimpleGrid,
  Container,
} from '@mantine/core';
import { IconGauge, IconUser, IconCookie } from '@tabler/icons-react';

import { FeatureCard } from './feature-card';

const mockdata = [
  {
    title: 'Extreme performance',
    description:
      'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit',
    icon: IconGauge,
  },
  {
    title: 'Privacy focused',
    description:
      'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma',
    icon: IconUser,
  },
  {
    title: 'No third parties',
    description:
      'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves',
    icon: IconCookie,
  },
];

export const FeaturesCards = () => {
  return (
    <Container size="lg" py="xl">
      <Group justify="center">
        <Badge variant="filled" size="lg">
          Best company ever
        </Badge>
      </Group>

      <Title order={2} ta="center" mt="sm">
        Integrate effortlessly with any technology stack
      </Title>

      <Text c="dimmed" ta="center" mt="md">
        Every once in a while, you’ll see a Golbat that’s missing some fangs.
        This happens when hunger drives it to try biting a Steel-type Pokémon.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {mockdata.map(({ title, description, icon }) => (
          <FeatureCard
            key={title}
            title={title}
            description={description}
            Icon={icon}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};
