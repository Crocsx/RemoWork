import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPencil } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { Place, PlaceEditor } from '~workspace/lib/feature/place';

export const PlaceEditModal = ({
  place,
  details = null,
}: {
  place?: Place;
  details?: google.maps.places.PlaceResult | null;
}) => {
  const [opened, { open, close }] = useDisclosure();
  const t = useTranslations();

  if (!details || !place) {
    return;
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="xl"
        title={t('place.component.placeReport.modal.title')}
      >
        <PlaceEditor
          mode="edition"
          onUpdated={close}
          details={details}
          initialValues={{
            address: details?.formatted_address,
            illustration: details?.photos?.[0]?.getUrl(),
            ...place,
          }}
        />
      </Modal>
      <Button type="button" leftSection={<IconPencil />} onClick={open}>
        {t('shared.action.edit', {
          entity: t('shared.entity.place', { count: 1 }),
        })}
      </Button>
    </>
  );
};
