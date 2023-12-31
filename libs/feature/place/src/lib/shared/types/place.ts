import { CertaintyLevel } from './certainty';
import { ComfortLevel } from './comfort';
import { NoiseLevel } from './noise';
import { PricingModel } from './price';
import { QuantityLevel } from './quantity';
import { SpeedLevel } from './wifi';

export interface FirestorePlace {
  id: string;
  name: string;
  geohash: string;
  illustration?: string;
  address?: string;
  country?: string;
  priceModel?: PricingModel;
  wifiAvailability?: CertaintyLevel;
  wifiLogin?: string;
  wifiPassword?: string;
  wifiSpeed?: SpeedLevel;
  noiseLevel?: NoiseLevel;
  talkingAllowed?: CertaintyLevel;
  plugsQuantity?: QuantityLevel;
  comfortLevel?: ComfortLevel;
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
}

export interface Place {
  id: string;
  name: string;
  longitude: number;
  latitude: number;
  country?: string;
  illustration?: string;
  address?: string;
  priceModel?: PricingModel;
  wifiAvailability?: CertaintyLevel;
  wifiLogin?: string;
  wifiPassword?: string;
  wifiSpeed?: SpeedLevel;
  noiseLevel?: NoiseLevel;
  talkingAllowed?: CertaintyLevel;
  plugsQuantity?: QuantityLevel;
  comfortLevel?: ComfortLevel;
  meetingSpace?: CertaintyLevel;
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
}
