import { Title, Text, SimpleGrid, Container } from '@mantine/core';
import {
  IconWorld,
  IconSearch,
  IconBuildingCommunity,
  IconBeer,
  IconBurger,
  IconTree,
  IconCoffee,
  IconHotelService,
  IconDesk,
  IconWifi,
  IconSofa,
  IconPlugConnected,
  IconChalkboard,
  IconEar,
  IconMapPinPlus,
  IconMessage,
  IconStarFilled,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { FeatureCard } from './feature-card';

const tiles = [
  {
    title: 'core.page.home.feature.bullet.explore.title',
    description: 'core.page.home.feature.bullet.explore.description',
    icon: <IconWorld />,
    color: 'primary',
    badges: [
      {
        icon: <IconBeer />,
        text: 'core.page.home.feature.bullet.explore.badge.bar',
      },
      {
        icon: <IconBurger />,
        text: 'core.page.home.feature.bullet.explore.badge.restaurant',
      },
      {
        icon: <IconTree />,
        text: 'core.page.home.feature.bullet.explore.badge.park',
      },
      {
        icon: <IconCoffee />,
        text: 'core.page.home.feature.bullet.explore.badge.coffee',
      },
      {
        icon: <IconHotelService />,
        text: 'core.page.home.feature.bullet.explore.badge.hotel',
      },
      {
        icon: <IconDesk />,
        text: 'core.page.home.feature.bullet.explore.badge.coworking',
      },
    ],
  },
  {
    title: 'core.page.home.feature.bullet.search.title',
    description: 'core.page.home.feature.bullet.search.description',
    icon: <IconSearch />,
    color: 'secondary',
    badges: [
      {
        icon: <IconWifi />,
        text: 'core.page.home.feature.bullet.search.badge.wifi',
      },
      {
        icon: <IconSofa />,
        text: 'core.page.home.feature.bullet.search.badge.comfort',
      },
      {
        icon: <IconEar />,
        text: 'core.page.home.feature.bullet.search.badge.noise',
      },
      {
        icon: <IconPlugConnected />,
        text: 'core.page.home.feature.bullet.search.badge.plug',
      },
      {
        icon: <IconChalkboard />,
        text: 'core.page.home.feature.bullet.search.badge.meeting',
      },
    ],
  },
  {
    title: 'core.page.home.feature.bullet.collaborate.title',
    description: 'core.page.home.feature.bullet.collaborate.description',
    icon: <IconBuildingCommunity />,
    color: 'primary',
    badges: [
      {
        icon: <IconMapPinPlus />,
        text: 'core.page.home.feature.bullet.collaborate.badge.add',
      },
      {
        icon: <IconMessage />,
        text: 'core.page.home.feature.bullet.collaborate.badge.discuss',
      },
      {
        icon: <IconStarFilled />,
        text: 'core.page.home.feature.bullet.collaborate.badge.rate',
      },
    ],
  },
];

export const FeaturesCards = () => {
  const t = useTranslations();
  return (
    <Container size="lg" py="xl">
      <Title order={2} ta="center" mt="sm">
        {t('core.page.home.feature.title')}
      </Title>

      <Text ta="center" mt="md">
        {t('core.page.home.feature.description')}
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {tiles.map(({ title, description, icon, color, badges }) => (
          <FeatureCard
            key={title}
            title={t(title)}
            description={t(description)}
            icon={icon}
            color={color}
            badges={badges}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};
