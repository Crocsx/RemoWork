import { PlaceMarker } from './place-marker';
import { usePlaceCtx } from '../../../place';
import { useMapCtx } from '../../context';

export const PlacesMarker = () => {
  const { service } = useMapCtx();
  const { places } = usePlaceCtx();

  return (
    <>
      {places?.map((p) => (
        <PlaceMarker key={p.id} place={p} service={service} />
      ))}
    </>
  );
};
