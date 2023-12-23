import { CertaintyLevel } from './certainty';
import { ComfortLevel } from './comfort';
import { NoiseLevel } from './noise';
import { PricingModel } from './price';
import { QuantityLevel } from './quantity';
import { SpeedLevel } from './wifi';

export type ReadPlacesRequest = {
  south?: number;
  east?: number;
  north?: number;
  west?: number;
  zoom?: number;
  wifiAvailability?: CertaintyLevel;
  wifiSpeed?: SpeedLevel;
  noiseLevel?: NoiseLevel;
  talkingAllowed?: CertaintyLevel;
  plugsQuantity?: QuantityLevel;
  comfortLevel?: ComfortLevel;
  priceModel?: PricingModel;
};
