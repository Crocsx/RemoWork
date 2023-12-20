import { Flex } from '@mantine/core';
import {
  IconCoin,
  IconCoinOff,
  IconEar,
  IconMicrophone,
  IconMicrophoneOff,
  IconPlug,
  IconSofa,
  IconWifi,
  IconWifiOff,
} from '@tabler/icons-react';

import {
  CertaintyLevel,
  Place,
  PricingModel,
  comfortLevelColor,
  noiseLevelColor,
  quantityLevelColor,
  speedLevelColor,
} from '~workspace/lib/feature/place';

export const PlaceIcons = ({ place }: { place: Place }) => {
  return (
    <Flex>
      {place.wifiAvailability === CertaintyLevel.YES ? (
        <IconWifi color={speedLevelColor(place.wifiSpeed)} size={18} />
      ) : (
        <IconWifiOff size={18} />
      )}
      {place.talkingAllowed === CertaintyLevel.YES ? (
        <IconMicrophone size={18} />
      ) : (
        <IconMicrophoneOff size={18} />
      )}
      {place.priceModel === PricingModel.FREE ? (
        <IconCoinOff size={18} />
      ) : (
        <IconCoin size={18} />
      )}
      <IconSofa color={comfortLevelColor(place.comfortLevel)} size={18} />
      <IconEar color={noiseLevelColor(place.noiseLevel)} size={18} />
      <IconPlug color={quantityLevelColor(place.plugsQuantity)} size={18} />
    </Flex>
  );
};
