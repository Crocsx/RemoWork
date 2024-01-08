import { Badge, Group, Text } from '@mantine/core';
import {
  IconChalkboard,
  IconChalkboardOff,
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
import { useTranslations } from 'next-intl';

import {
  CertaintyLevel,
  Place,
  PricingModel,
  certaintyLevelColor,
  comfortLevelColor,
  noiseLevelColor,
  pricingModelColor,
  quantityLevelColor,
  speedLevelColor,
} from '../../../shared';

export const PlaceIcons = ({ place }: { place: Place }) => {
  const t = useTranslations();

  return (
    <Group gap={6}>
      {place.wifiAvailability &&
        (place.wifiAvailability === CertaintyLevel.NO ? (
          <Badge
            leftSection={<IconWifiOff size={16} />}
            size="xs"
            color={certaintyLevelColor(place.wifiAvailability)}
          >
            <Text fz="xs">
              {t('shared.enum.certaintyLevel', {
                certainty: place.wifiAvailability,
              })}
            </Text>
          </Badge>
        ) : (
          <Badge
            leftSection={<IconWifi size={16} />}
            size="xs"
            color={speedLevelColor(place.wifiSpeed)}
          >
            <Text fz="xs">
              {t('shared.enum.speedLevel', {
                speed: place.wifiSpeed,
              })}
            </Text>
          </Badge>
        ))}
      {place.talkingAllowed && (
        <Badge
          size="xs"
          color={certaintyLevelColor(place.talkingAllowed)}
          leftSection={
            place.talkingAllowed === CertaintyLevel.NO ? (
              <IconMicrophone size={16} />
            ) : (
              <IconMicrophoneOff size={16} />
            )
          }
        >
          <Text fz="xs">
            {t('shared.enum.certaintyLevel', {
              certainty: place.talkingAllowed,
            })}
          </Text>
        </Badge>
      )}
      {place.meetingSpace && (
        <Badge
          size="xs"
          color={certaintyLevelColor(place.meetingSpace)}
          leftSection={
            place.meetingSpace === CertaintyLevel.NO ? (
              <IconChalkboard size={16} />
            ) : (
              <IconChalkboardOff size={16} />
            )
          }
        >
          <Text fz="xs">
            {t('shared.enum.certaintyLevel', {
              certainty: place.meetingSpace,
            })}
          </Text>
        </Badge>
      )}
      {place.priceModel && (
        <Badge
          leftSection={
            place.priceModel === PricingModel.FREE ? (
              <IconCoinOff size={16} />
            ) : (
              <IconCoin size={16} />
            )
          }
          size="xs"
          color={pricingModelColor(place.priceModel)}
        >
          <Text fz="xs">
            {t('shared.enum.priceModel', {
              price: place.priceModel,
            })}
          </Text>
        </Badge>
      )}

      {place.comfortLevel && (
        <Badge
          size="xs"
          leftSection={<IconSofa size={16} />}
          color={comfortLevelColor(place.comfortLevel)}
        >
          <Text fz="xs">
            {t('shared.enum.comfortLevel', {
              comfort: place.comfortLevel,
            })}
          </Text>
        </Badge>
      )}
      {place.noiseLevel && (
        <Badge
          leftSection={<IconEar size={16} />}
          size="xs"
          color={noiseLevelColor(place.noiseLevel)}
        >
          <Text fz="xs">
            {t('shared.enum.noiseLevel', {
              noise: place.noiseLevel,
            })}
          </Text>
        </Badge>
      )}
      {place.plugsQuantity && (
        <Badge
          leftSection={<IconPlug size={16} />}
          size="xs"
          color={quantityLevelColor(place.plugsQuantity)}
        >
          <Text fz="xs">
            {t('shared.enum.quantityLevel', {
              quantity: place.plugsQuantity,
            })}
          </Text>
        </Badge>
      )}
    </Group>
  );
};
