import { CertaintyLevel } from '../certainty';
import { ComfortLevel } from '../comfort';
import { NoiseLevel } from '../noise';
import { Place } from '../place';
import { PricingModel } from '../price';
import { QuantityLevel } from '../quantity';
import { SpeedLevel } from '../wifi';

export type PlaceAddRequest = Place;
export type PlaceAddResponse = Place | undefined;

export type PlaceDeleteRequest = void;
export type PlaceDeleteResponse = { success: boolean };

export type PlaceGetRequest = void;
export type PlaceGetResponse = Place;

export type PlaceReportRequest = void;
export type PlaceReportResponse = { sent: boolean };

export type PlaceUpdateRequest = Place;
export type PlaceUpdateResponse = Place;

export type PlacesGetRequest = {
  filters: {
    south?: number;
    east?: number;
    north?: number;
    west?: number;
    zoom?: number;
    placeId?: string;
    wifiAvailability?: CertaintyLevel;
    wifiSpeed?: SpeedLevel;
    noiseLevel?: NoiseLevel;
    talkingAllowed?: CertaintyLevel;
    meetingSpace?: CertaintyLevel;
    plugsQuantity?: QuantityLevel;
    comfortLevel?: ComfortLevel;
    priceModel?: PricingModel;
  };
  sortBy?: {
    field: 'createdAt' | 'updatedAt';
    dir?: 'asc' | 'desc';
  };
  fromDocId?: string;
  perPage?: number;
};
export type PlacesGetResponse = Place[];
