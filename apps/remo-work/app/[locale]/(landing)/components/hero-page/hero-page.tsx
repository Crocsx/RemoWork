import {
  Title,
  Text,
  Container,
  Button,
  Flex,
  BackgroundImage,
  rem,
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
      <Flex
        direction="column"
        justify="end"
        pos="relative"
        py="md"
        style={{ zIndex: 2 }}
      >
        <Title
          ta="center"
          order={1}
          px="md"
          tt="uppercase"
          mb="xs"
          fz={{ base: rem(28), lg: rem(48) }}
          c="secondary.8"
        >
          {t.rich('core.page.home.hero.title', {
            important: (chunks) => (
              <Text
                fw="bold"
                tt="uppercase"
                fz={{ base: rem(32), lg: rem(64) }}
                c="secondary.8"
              >
                {chunks}
              </Text>
            ),
          })}
        </Title>

        <Container size={640}>
          <Text
            fz={{ base: rem(16), lg: rem(18) }}
            size="md"
            ta="center"
            tt="uppercase"
            fw="bold"
            c="secondary.8"
          >
            {t('core.page.home.hero.description')}
          </Text>
        </Container>

        <Flex
          mt={{ base: 'sm', sm: 'xl' }}
          justify="center"
          px="md"
          direction={{ base: 'column', md: 'row' }}
        >
          <Button component="a" size="lg" href="/explore">
            {t('shared.button.explore')}
          </Button>
        </Flex>
      </Flex>
    </BackgroundImage>
  );
};
