import {
  CertaintyLevel,
  ComfortLevel,
  NoiseLevel,
  Place,
  QuantityLevel,
  SpeedLevel,
} from '../../shared';

function getPlaceDetails(
  service: google.maps.places.PlacesService,
  placeId: string,
  fields: (keyof google.maps.places.PlaceResult)[]
): Promise<google.maps.places.PlaceResult | null> {
  return new Promise((resolve, reject) => {
    service.getDetails({ placeId, fields }, (detail, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        resolve(detail);
      } else {
        reject(new Error(status));
      }
    });
  });
}

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

  static retrieveFromCache = async (
    placeId: string,
    fields: (keyof google.maps.places.PlaceResult)[],
    service: google.maps.places.PlacesService
  ) => {
    const cache = PlaceUtils.cache[placeId];
    const missingField = fields.some((key) => !cache?.[key]);
    try {
      if (missingField) {
        const place = await getPlaceDetails(service, placeId, fields);
        PlaceUtils.addPlace(placeId, place);
        return place;
      } else {
        return cache;
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  };

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
