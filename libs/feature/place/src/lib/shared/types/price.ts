export enum PricingModel {
  'FREE' = 'FREE',
  'PAID' = 'PAID',
}

export const pricingModelColor = (pricingModel?: PricingModel) => {
  if (pricingModel === PricingModel.PAID) {
    return 'orange';
  }
  if (pricingModel === PricingModel.FREE) {
    return 'green';
  }
  return 'grey';
};
