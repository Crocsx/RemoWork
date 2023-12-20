export enum ComfortLevel {
  'UNCOMFORTABLE' = 'UNCOMFORTABLE',
  'ADEQUATE' = 'ADEQUATE',
  'COMFORTABLE' = 'COMFORTABLE',
}

export const comfortLevelColor = (comfortLevel?: ComfortLevel) => {
  if (comfortLevel === ComfortLevel.UNCOMFORTABLE) {
    return 'red';
  }
  if (comfortLevel === ComfortLevel.ADEQUATE) {
    return 'orange';
  }
  if (comfortLevel === ComfortLevel.COMFORTABLE) {
    return 'green';
  }
  return 'grey';
};
