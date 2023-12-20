import {
  Card,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  CardSection,
  rem,
} from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';

import { Image } from '~workspace/lib/shared/ui';

export const PlaceCard = ({
  image,
  title,
  description,
  country,
  badges,
}: {
  image: string;
  title: string;
  description: string;
  country: string;
  badges: { emoji: string; label: string }[];
}) => {
  return (
    <Card withBorder radius="md" p="md">
      <CardSection h={180} pos="relative">
        <Image src={image} alt={title} fill />
      </CardSection>

      <CardSection p="md">
        <Group>
          <Group justify="apart">
            <Text fz="lg" fw={500}>
              {title}
            </Text>
            <Badge size="sm" variant="light">
              {country}
            </Badge>
          </Group>
          <Text fz="sm" mt="xs">
            {description}
          </Text>
        </Group>
        <Group>
          <Text
            mt="md"
            fw="700"
            style={{ textTransform: 'uppercase' }}
            fz="xs"
            c="dimmed"
          >
            Perfect for you, if you enjoy
          </Text>
          <Group gap={7} mt={5}>
            {badges.map((badge) => (
              <Badge
                variant="light"
                key={badge.label}
                leftSection={badge.emoji}
              >
                {badge.label}
              </Badge>
            ))}
          </Group>
        </Group>
      </CardSection>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }}>
          Show details
        </Button>
        <ActionIcon variant="default" radius="md" size={36}>
          <IconHeart
            color="var(--mantine-color-red-6)"
            width={rem(20)}
            height={rem(20)}
            stroke={1.5}
          />
        </ActionIcon>
      </Group>
    </Card>
  );
};
