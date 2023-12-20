import { useTranslations } from 'use-intl';

export const PlaceOpeningTime = ({
  openingHours,
}: {
  openingHours?: google.maps.places.PlaceOpeningHours;
}) => {
  const t = useTranslations();
  const dailyOpening = openingHours?.periods?.[new Date().getDay() - 1];

  return (
    <>
      {t('shared.button.today')}
      {` `}
      {`${dailyOpening?.open.hours}:${dailyOpening?.open.minutes}` || '-'}
      {` : `}
      {`${dailyOpening?.close?.hours}:${dailyOpening?.close?.minutes}` || '-'}
    </>
  );
};
