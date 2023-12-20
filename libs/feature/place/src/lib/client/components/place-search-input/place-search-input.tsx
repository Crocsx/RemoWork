import { forwardRef } from 'react';
import {
  ReactGoogleAutocompleteProps,
  usePlacesWidget,
} from 'react-google-autocomplete';

import { TextInput, TextInputProps } from '@mantine/core';
import { useMergedRef } from '@mantine/hooks';

export const PlaceSearchInput = forwardRef<
  HTMLInputElement,
  { widgetOptions: ReactGoogleAutocompleteProps } & TextInputProps
>(({ widgetOptions, ...rest }, ref) => {
  const { ref: placesRef } = usePlacesWidget<HTMLInputElement>({
    ...widgetOptions,
  });

  const mergedRef = useMergedRef(ref, placesRef);

  return <TextInput ref={mergedRef} {...rest} />;
});
