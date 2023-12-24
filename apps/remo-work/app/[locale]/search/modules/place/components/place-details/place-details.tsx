import { Button, Group } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export const PlaceDetails = ({ placeId }: { placeId: string }) => {
  const { back } = useRouter();
  const t = useTranslations();

  return (
    <Group>
      <Button onClick={back}>{t('shared.button.back')}</Button>
    </Group>
  );
};
