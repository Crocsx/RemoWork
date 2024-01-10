import {
  useMapCtx,
  usePlaceCtx,
} from '~workspace/app/remo-work/app/explore/_context';

import { PlaceMarker } from './place-marker';

export const PlacesMarker = () => {
  const { service } = useMapCtx();
  const { places, selectedPlaceId } = usePlaceCtx();
  const { setSelectedPlaceId } = usePlaceCtx();

  return (
    <>
      {places?.map((p) => (
        <PlaceMarker
          key={p.id}
          place={p}
          service={service}
          onClickHandler={() => setSelectedPlaceId(p.id)}
          selected={selectedPlaceId === p.id}
        />
      ))}
    </>
  );
};
