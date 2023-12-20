export enum NoiseLevel {
  'QUIET' = 'QUIET',
  'MODERATE' = 'MODERATE',
  'NOISY' = 'NOISY',
}

export const noiseLevelColor = (noiseLevel?: NoiseLevel) => {
  if (noiseLevel === NoiseLevel.NOISY) {
    return 'red';
  }
  if (noiseLevel === NoiseLevel.MODERATE) {
    return 'orange';
  }
  if (noiseLevel === NoiseLevel.QUIET) {
    return 'green';
  }
  return 'grey';
};
