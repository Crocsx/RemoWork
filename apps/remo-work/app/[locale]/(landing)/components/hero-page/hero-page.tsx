import {
  Title,
  Text,
  Container,
  Button,
  Overlay,
  Flex,
  BackgroundImage,
} from '@mantine/core';
import { useTranslations } from 'next-intl';

import logoColumn from '~workspace/app/remo-work/public/images/hero.png';

export const Heropage = () => {
  const t = useTranslations();
  return (
    <BackgroundImage
      src={logoColumn.src}
      h="calc(100vh - 60px)"
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      pb="md"
    >
      <Overlay
        color="#000"
        opacity={0.65}
        pos="absolute"
        w="100%"
        h="100%"
        zIndex={1}
      />

      <Flex
        direction="column"
        justify="end"
        pos="relative"
        pb="md"
        h="100%"
        style={{ zIndex: 2 }}
      >
        <Title
          c="var(--mantine-color-white)"
          ta="center"
          order={1}
          px="md"
          mb="xs"
        >
          {t('core.page.home.hero.title')}
        </Title>

        <Container size={640}>
          <Text size="md" c="var(--mantine-color-gray-0)" ta="center">
            {t('core.page.home.hero.description')}
          </Text>
        </Container>

        <Flex
          mt={{ base: 'sm', sm: 'xl' }}
          justify="center"
          px="md"
          direction={{ base: 'column', md: 'row' }}
        >
          <Button component="a" size="lg" href="/search">
            {t('shared.action.goTo', {
              entity: t('shared.entity.map', { count: 1 }),
            })}
          </Button>
        </Flex>
      </Flex>
    </BackgroundImage>
  );
};
