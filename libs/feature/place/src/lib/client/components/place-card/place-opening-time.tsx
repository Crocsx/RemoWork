import { Badge, Flex, Text } from '@mantine/core';
import { useTranslations } from 'use-intl';

import { TimeUtils } from '~workspace/lib/shared/utils';

export const PlaceOpeningTime = ({
  openingHours,
}: {
  openingHours?: google.maps.places.PlaceOpeningHours;
}) => {
  const t = useTranslations();
  const today = new Date().getDay();
  const todayOpening = openingHours?.periods?.filter(
    (period) => period.open.day === today
  );

  return (
    <Flex wrap="nowrap" fz="sm" direction="column">
      <Text fz="sm">
        {t('shared.button.today')} :
        {typeof openingHours?.isOpen() === 'boolean' && (
          <Badge c={openingHours?.isOpen() ? 'green' : 'red'}>
            {t('shared.enum.open', {
              open: openingHours?.isOpen()?.toString(),
            })}
          </Badge>
        )}
      </Text>
      {todayOpening?.map(({ open, close }) => {
        return (
          <Text fz="sm" key={`${open.day}${open.time}`}>
            {TimeUtils.formatTime(open.hours, open.minutes)}~
            {TimeUtils.formatTime(close?.hours, close?.minutes)}
          </Text>
        );
      })}
    </Flex>
  );
};
