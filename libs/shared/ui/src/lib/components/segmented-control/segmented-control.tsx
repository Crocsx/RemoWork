import {
  Input,
  SegmentedControl as MantineSegmentedControl,
  SegmentedControlProps,
} from '@mantine/core';

export const SegmentedControl = ({
  label,
  data,
  value,
  defaultValue,
  onChange,
  disabled,
  name,
  fullWidth,
  color,
  size,
  radius,
  transitionDuration,
  transitionTimingFunction,
  orientation,
  readOnly,
  vars,
  styles,
  classNames,
  ...rest
}: SegmentedControlProps & { label?: React.ReactNode }) => {
  return (
    <Input.Wrapper display="flex" style={{ flexDirection: 'column' }} {...rest}>
      <Input.Label>{label}</Input.Label>
      <MantineSegmentedControl
        vars={vars}
        styles={styles}
        classNames={classNames}
        orientation={orientation}
        readOnly={readOnly}
        transitionDuration={transitionDuration}
        radius={radius}
        transitionTimingFunction={transitionTimingFunction}
        size={size}
        color={color}
        fullWidth={fullWidth}
        name={name}
        data={data}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
      />
    </Input.Wrapper>
  );
};
