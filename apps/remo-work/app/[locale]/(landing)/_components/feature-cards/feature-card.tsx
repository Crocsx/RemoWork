import { cloneElement } from 'react';

import { Text, Card, Flex, Avatar, Badge } from '@mantine/core';
import { useTranslations } from 'next-intl';

export const FeatureCard = ({
  title,
  description,
  icon,
  color,
  badges,
}: {
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
  badges: {
    text: string;
    icon: JSX.Element;
  }[];
}) => {
  const t = useTranslations();
  return (
    <Card key={title} shadow="md" padding="xl" bg={color}>
      <Flex justify="center" align="center" direction="column">
        <Avatar bg={`${color}.4`} size={64}>
          {cloneElement(icon, { size: 32, color: 'white' })}
        </Avatar>
        <Text fz="xl" ta="center" fw="bold" mt="md" c="white" tt="uppercase">
          {title}
        </Text>
        <Text fz="sm" mt="sm" c="white">
          {description}
        </Text>
        <Flex gap="xs" py="md" wrap="wrap">
          {badges.map(({ icon, text }) => (
            <Badge
              key={text}
              bg={`${color}.4`}
              size="md"
              py="sm"
              leftSection={cloneElement(icon, {
                size: 24,
              })}
            >
              {t(text)}
            </Badge>
          ))}
        </Flex>
      </Flex>
    </Card>
  );
};
