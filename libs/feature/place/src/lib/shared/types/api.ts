import { CertaintyLevel } from './certainty';
import { ComfortLevel } from './comfort';
import { NoiseLevel } from './noise';
import { PricingModel } from './price';
import { QuantityLevel } from './quantity';
import { SpeedLevel } from './wifi';

export type ReadPlacesRequest = {
  filters?: {
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

export type ReportPlaceRequest = {
  placeId: string;
  reason: string;
};
