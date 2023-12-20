export enum QuantityLevel {
  'NONE' = 'NONE',
  'SOME' = 'SOME',
  'MANY' = 'MANY',
}

export const quantityLevelColor = (quantityLevel?: QuantityLevel) => {
  if (quantityLevel === QuantityLevel.NONE) {
    return 'red';
  }
  if (quantityLevel === QuantityLevel.SOME) {
    return 'orange';
  }
  if (quantityLevel === QuantityLevel.MANY) {
    return 'green';
  }
  return 'grey';
};
