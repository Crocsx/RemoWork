export class PlaceUtils {
  static cache: Record<string, google.maps.places.PlaceResult> = {};

  static addPlace(id: string, details: google.maps.places.PlaceResult | null) {
    if (!details) return;
    PlaceUtils.cache[id] = {
      ...PlaceUtils.cache[id],
      ...details,
    };
  }
}
