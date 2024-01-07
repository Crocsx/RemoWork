import {
  Card,
  Text,
  Group,
  Button,
  CardSection,
  rem,
  Badge,
} from '@mantine/core';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Place, PlaceIcons } from '~workspace/lib/feature/place';
import { Image } from '~workspace/lib/shared/ui';

export const PlaceCarouselCard = ({
  illustration,
  id,
  name,
  country,
  address,
  ...rest
}: Place) => {
  const t = useTranslations();
  return (
    <Card withBorder radius="md" p="md" bg="secondary.2">
      <CardSection h={rem(245)} pos="relative">
        <Image src={illustration} alt={name} fill sizes="350px" />
      </CardSection>

      <CardSection p="md">
        <Group gap={0}>
          <Group justify="apart">
            <Text fz="lg" fw={500}>
              {name}
            </Text>
            {country && (
              <Badge size="sm" variant="light">
                {country}
              </Badge>
            )}
          </Group>
          <Text fz="sm">{address}</Text>
          <Text fw="700" style={{ textTransform: 'uppercase' }} fz="xs" py="sm">
            {t('shared.entity.detail', { count: 2 })}
          </Text>
          <Group>
            <PlaceIcons place={{ illustration, name, id, country, ...rest }} />
          </Group>
        </Group>
      </CardSection>

      <Group mt="xs">
        <Button
          radius="md"
          style={{ flex: 1 }}
          component={Link}
          href={`/explore?placeId=${id}`}
        >
          {t('shared.action.show', {
            entity: t('shared.entity.detail', { count: 1 }),
          })}
        </Button>
      </Group>
    </Card>
  );
};
