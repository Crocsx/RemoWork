import {
  CertaintyLevel,
  ComfortLevel,
  NoiseLevel,
  Place,
  QuantityLevel,
  SpeedLevel,
} from '../../shared';

function rateAttribute<T extends string>(
  attribute: T | undefined,
  ratingMap: Record<T, number>
): number {
  return attribute !== undefined ? ratingMap[attribute] : 0;
}

export class PlaceUtils {
  static cache: Record<string, google.maps.places.PlaceResult> = {};

  static addPlace(id: string, details: google.maps.places.PlaceResult | null) {
    if (!details) return;
    PlaceUtils.cache[id] = {
      ...PlaceUtils.cache[id],
      ...details,
    };
  }

  static ratePlace(place?: Place): number {
    let score = 0;

    score += rateAttribute(place?.wifiAvailability, {
      YES: 2,
      MAYBE: 1,
      NO: 0,
    } as Record<CertaintyLevel, number>);
    score += rateAttribute(place?.wifiSpeed, {
      SLOW: 0,
      AVERAGE: 1,
      FAST: 2,
    } as Record<SpeedLevel, number>);
    score += rateAttribute(place?.noiseLevel, {
      QUIET: 2,
      MODERATE: 1,
      NOISY: 0,
    } as Record<NoiseLevel, number>);
    score += rateAttribute(place?.talkingAllowed, {
      YES: 2,
      MAYBE: 1,
      NO: 0,
    } as Record<CertaintyLevel, number>);
    score += rateAttribute(place?.plugsQuantity, {
      NONE: 0,
      SOME: 1,
      MANY: 2,
    } as Record<QuantityLevel, number>);
    score += rateAttribute(place?.comfortLevel, {
      UNCOMFORTABLE: 0,
      ADEQUATE: 1,
      COMFORTABLE: 2,
    } as Record<ComfortLevel, number>);
    score += place?.priceModel === 'FREE' ? 1 : 0;

    const maxScore = 13;
    return (score / maxScore) * 5;
  }
}
