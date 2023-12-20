import { Text, Card, rem } from '@mantine/core';
import { TablerIconsProps } from '@tabler/icons-react';

export const FeatureCard = ({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: (props: TablerIconsProps) => JSX.Element;
}) => {
  return (
    <Card key={title} shadow="md" radius="md" padding="xl">
      <Icon style={{ width: rem(50), height: rem(50) }} stroke={2} />
      <Text fz="lg" fw={500} mt="md">
        {title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {description}
      </Text>
    </Card>
  );
};
