export enum SpeedLevel {
  'SLOW' = 'SLOW',
  'AVERAGE' = 'AVERAGE',
  'FAST' = 'FAST',
}

export const speedLevelColor = (speedlevel?: SpeedLevel) => {
  if (speedlevel === SpeedLevel.SLOW) {
    return 'red';
  }
  if (speedlevel === SpeedLevel.AVERAGE) {
    return 'orange';
  }
  if (speedlevel === SpeedLevel.FAST) {
    return 'green';
  }
  return 'grey';
};
