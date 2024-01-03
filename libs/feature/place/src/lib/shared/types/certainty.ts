export enum CertaintyLevel {
  'YES' = 'YES',
  'MAYBE' = 'MAYBE',
  'NO' = 'NO',
}

export const certaintyLevelColor = (certaintyLevel?: CertaintyLevel) => {
  if (certaintyLevel === CertaintyLevel.NO) {
    return 'red';
  }
  if (certaintyLevel === CertaintyLevel.MAYBE) {
    return 'orange';
  }
  if (certaintyLevel === CertaintyLevel.YES) {
    return 'green';
  }
  return 'grey';
};
