import {
  Badge,
  Group,
  Title,
  Text,
  SimpleGrid,
  Container,
} from '@mantine/core';
import {
  IconWorld,
  IconSearch,
  IconBuildingCommunity,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { FeatureCard } from './feature-card';

const tiles = [
  {
    title: 'core.page.home.feature.bullet.worldwide.title',
    description: 'core.page.home.feature.bullet.worldwide.description',

    icon: IconWorld,
  },
  {
    title: 'core.page.home.feature.bullet.tailored.title',
    description: 'core.page.home.feature.bullet.tailored.description',
    icon: IconSearch,
  },
  {
    title: 'core.page.home.feature.bullet.community.title',
    description: 'core.page.home.feature.bullet.community.description',
    icon: IconBuildingCommunity,
  },
];

export const FeaturesCards = () => {
  const t = useTranslations();
  return (
    <Container size="lg" py="xl">
      <Group justify="center">
        <Badge variant="filled" size="lg">
          {t('core.page.home.feature.title')}
        </Badge>
      </Group>

      <Title order={2} ta="center" mt="sm">
        {t('core.page.home.feature.catch')}
      </Title>

      <Text c="dimmed" ta="center" mt="md">
        {t('core.page.home.feature.description')}
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {tiles.map(({ title, description, icon }) => (
          <FeatureCard
            key={title}
            title={t(title)}
            description={t(description)}
            Icon={icon}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};
