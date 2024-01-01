import { Flex, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

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
    <Flex direction="column">
      {(todayOpening || [])?.length === 0 ? (
        <Text fz="sm">
          {t('core.page.map.module.place.viewer.button.closedAllDay')}
        </Text>
      ) : (
        todayOpening?.map(({ open, close }) => {
          return (
            <Text fz="sm" key={`${open.day}${open.time}`}>
              {TimeUtils.formatTime(open.hours, open.minutes)}~
              {TimeUtils.formatTime(close?.hours, close?.minutes)}
            </Text>
          );
        })
      )}
    </Flex>
  );
};
