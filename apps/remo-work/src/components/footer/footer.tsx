import { Container, Divider, Group, Text } from '@mantine/core';

export const Footer = () => {
  return (
    <Container fluid className="flex justify-center">
      <Divider />
      <Group justify="center" ml="auto" py="sm">
        <Text size={'sm'}>
          © Copyright {new Date().getFullYear()} Ythlium. All rights reserved.
        </Text>
      </Group>
    </Container>
  );
};
