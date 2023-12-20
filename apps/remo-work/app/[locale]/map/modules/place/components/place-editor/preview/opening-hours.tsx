import React from 'react';

import { Badge, Flex, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { DayOfWeek } from '~workspace/lib/shared/ui';
import { ObjectUtils } from '~workspace/lib/shared/utils';

const formatTime = (time?: string) => {
  return time ? `${time.slice(0, 2)}:${time.slice(2)}` : `-`;
};

const DisplayOpeningHours = ({
  openingHours,
}: {
  openingHours?: google.maps.places.PlaceOpeningHours;
}) => {
  const t = useTranslations();

  if (!openingHours || !openingHours.periods) {
    return <div>No opening hours available</div>;
  }

  return (
    <>
      {ObjectUtils.arrayFromEnum(DayOfWeek).map((day, i) => {
        const { open, close } = openingHours.periods?.[i] || {};
        return (
          <Flex key={day} align="center" gap="md" fz="xs">
            {open ? (
              <Badge>
                {formatTime(open?.time)} - {formatTime(close?.time)}
              </Badge>
            ) : (
              <Badge color="red">{t('shared.button.close')}</Badge>
            )}
            {i === 1 && (
              <Text>{t('shared.enum.day', { day: DayOfWeek.MONDAY })}</Text>
            )}
            {i === 2 && (
              <Text>{t('shared.enum.day', { day: DayOfWeek.TUESDAY })}</Text>
            )}
            {i === 3 && (
              <Text>{t('shared.enum.day', { day: DayOfWeek.WEDNESDAY })}</Text>
            )}
            {i === 4 && (
              <Text>{t('shared.enum.day', { day: DayOfWeek.THURSDAY })}</Text>
            )}
            {i === 5 && (
              <Text>{t('shared.enum.day', { day: DayOfWeek.FRIDAY })}</Text>
            )}
            {i === 6 && (
              <Text>{t('shared.enum.day', { day: DayOfWeek.SATURDAY })}</Text>
            )}
            {i === 0 && (
              <Text>{t('shared.enum.day', { day: DayOfWeek.SUNDAY })}</Text>
            )}
          </Flex>
        );
      })}
    </>
  );
};

export default DisplayOpeningHours;
