import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconAlertTriangleFilled } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { PlaceReport } from '~workspace/lib/feature/place';

export const PlaceReportModal = ({ placeId }: { placeId?: string }) => {
  const [opened, { open, close }] = useDisclosure();
  const t = useTranslations();

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="xl"
        title={t('place.component.placeReport.modal.title')}
      >
        <PlaceReport
          initialValues={{
            reason: '',
            placeId: placeId || '',
          }}
          onReported={close}
        />
      </Modal>
      <Button
        onClick={open}
        variant="subtle"
        color="red"
        leftSection={<IconAlertTriangleFilled />}
      >
        {t('shared.action.report', {
          entity: t('shared.entity.place', { count: 1 }),
        })}
      </Button>
    </>
  );
};
