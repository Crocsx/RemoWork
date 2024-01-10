import React from 'react';

import { Grid } from '@mantine/core';

export const PlaceDetailField = ({
  title,
  value,
}: {
  title: React.ReactNode;
  value: React.ReactNode;
}) => {
  return (
    <>
      <Grid.Col span={4} fw="bold">
        {title}
      </Grid.Col>
      <Grid.Col span={8}>{value}</Grid.Col>
    </>
  );
};
