import { Title, Text, Container, Button, Overlay, Flex } from '@mantine/core';

import classes from './hero-page.module.css';

export const Heropage = () => {
  return (
    <div className={classes['wrapper']}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div style={{ zIndex: 1, position: 'relative' }}>
        <Title
          c="var(--mantine-color-white)"
          ta="center"
          order={1}
          px="md"
          mb="xs"
        >
          Automated AI code reviews for
          <Text component="span" inherit c="var(--mantine-color-primary-4)">
            any stack
          </Text>
        </Title>

        <Container size={640}>
          <Text size="lg" c="var(--mantine-color-gray-0)" ta="center">
            Build more reliable software with AI companion. AI is also trained
            to detect lazy developers who do nothing and just complain on
            Twitter.
          </Text>
        </Container>

        <Flex
          mt="xl"
          justify="center"
          px="md"
          direction={{ base: 'column', md: 'row' }}
        >
          <Button
            component="a"
            className={classes['control']}
            variant="white"
            size="lg"
            href="/search"
          >
            Get started
          </Button>
        </Flex>
      </div>
    </div>
  );
};
