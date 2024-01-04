import { useCallback } from 'react';

import { Chip, Flex } from '@mantine/core';
import { useTranslations } from 'next-intl';

import {
  CertaintyLevel,
  ComfortLevel,
  NoiseLevel,
  PricingModel,
  QuantityLevel,
  ReadPlacesRequest,
  SpeedLevel,
} from '~workspace/lib/feature/place';

export const PlaceFilters = ({
  filters,
  filterChangeHandler,
}: {
  filters: ReadPlacesRequest['filters'];
  filterChangeHandler: (filter: ReadPlacesRequest['filters']) => void;
}) => {
  const t = useTranslations();
  const handleChipClick = useCallback(
    <K extends keyof ReadPlacesRequest['filters']>(
      key: K,
      value: ReadPlacesRequest['filters'][K]
    ) => {
      const newFilters = { ...filters };
      if (newFilters[key] === value) {
        delete newFilters[key];
      } else {
        newFilters[key] = value;
      }
      filterChangeHandler(newFilters);
    },
    [filterChangeHandler, filters]
  );

  return (
    <Flex gap="xs" wrap="wrap" py="md">
      <Chip
        size="xs"
        checked={filters.wifiSpeed === SpeedLevel.FAST}
        onClick={() => handleChipClick('wifiSpeed', SpeedLevel.FAST)}
      >
        {t('core.page.map.module.place.viewer.filter.wifiSpeed')}
      </Chip>
      <Chip
        size="xs"
        checked={filters.noiseLevel === NoiseLevel.QUIET}
        onClick={() => handleChipClick('noiseLevel', NoiseLevel.QUIET)}
      >
        {t('core.page.map.module.place.viewer.filter.noiseLevel')}
      </Chip>
      <Chip
        size="xs"
        checked={filters.talkingAllowed === CertaintyLevel.YES}
        onClick={() => handleChipClick('talkingAllowed', CertaintyLevel.YES)}
      >
        {t('core.page.map.module.place.viewer.filter.talkingAllowed')}
      </Chip>
      <Chip
        size="xs"
        checked={filters.meetingSpace === CertaintyLevel.YES}
        onClick={() => handleChipClick('meetingSpace', CertaintyLevel.YES)}
      >
        {t('core.page.map.module.place.viewer.filter.meetingSpace')}
      </Chip>
      <Chip
        size="xs"
        checked={filters.plugsQuantity === QuantityLevel.MANY}
        onClick={() => handleChipClick('plugsQuantity', QuantityLevel.MANY)}
      >
        {t('core.page.map.module.place.viewer.filter.plugsQuantity')}
      </Chip>
      <Chip
        size="xs"
        checked={filters.comfortLevel === ComfortLevel.COMFORTABLE}
        onClick={() =>
          handleChipClick('comfortLevel', ComfortLevel.COMFORTABLE)
        }
      >
        {t('core.page.map.module.place.viewer.filter.comfortLevel')}
      </Chip>
      <Chip
        size="xs"
        checked={filters.priceModel === PricingModel.FREE}
        onClick={() => handleChipClick('priceModel', PricingModel.FREE)}
      >
        {t('core.page.map.module.place.viewer.filter.priceModel')}
      </Chip>
    </Flex>
  );
};
