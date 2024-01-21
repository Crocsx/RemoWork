import { Suspense } from 'react';

import { Heropage, FeaturesCards, PlacesCarousel } from './_components';
import { PlacesCarouselLoader } from './_components/places-carousel/place-carousel.loader';

export default function Page() {
  return (
    <>
      <Heropage />
      <FeaturesCards />
      <Suspense fallback={<PlacesCarouselLoader />}>
        <PlacesCarousel />
      </Suspense>
    </>
  );
}
