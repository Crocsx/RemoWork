import { Flex, Grid, Group, Text } from '@mantine/core';
import { useTranslations } from 'use-intl';

import { TimeUtils } from '~workspace/lib/shared/utils';

export const PlaceOpeningTime = ({
  openingHours,
}: {
  openingHours?: google.maps.places.PlaceOpeningHours;
}) => {
  const t = useTranslations();
  const isOpened = openingHours?.isOpen();
  const today = new Date().getDay();
  const todayOpening = openingHours?.periods?.filter(
    (period) => period.open.day === today - 1
  );

  return (
    <Grid>
      <Grid.Col span={4}>
        <Text>{t('shared.button.today')} :</Text>
      </Grid.Col>
      <Grid.Col span={8}>
        <Group gap={0}>
          {isOpened ? (
            <Text c="red">{t('shared.button.close')}</Text>
          ) : (
            todayOpening?.map(({ open, close }) => {
              return (
                <Flex wrap="nowrap" key={`${open.day}${open.time}`}>
                  {TimeUtils.formatTime(open.hours, open.minutes)}~
                  {TimeUtils.formatTime(close?.hours, close?.minutes)}
                </Flex>
              );
            })
          )}
        </Group>
      </Grid.Col>
    </Grid>
  );
};
