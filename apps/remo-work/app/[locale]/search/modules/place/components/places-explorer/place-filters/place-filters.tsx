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
} from '~workspace/lib/feature/place';

export const PlaceFilters = ({
  filters,
  filterChangeHandler,
}: {
  filters: ReadPlacesRequest;
  filterChangeHandler: (filter: ReadPlacesRequest) => void;
}) => {
  const t = useTranslations();
  const handleChipClick = useCallback(
    <K extends keyof ReadPlacesRequest>(
      key: K,
      value: ReadPlacesRequest[K]
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
        checked={filters.wifiAvailability === CertaintyLevel.YES}
        onClick={() => handleChipClick('wifiAvailability', CertaintyLevel.YES)}
      >
        {t('core.page.map.module.place.viewer.filter.wifiAvailability')}
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
