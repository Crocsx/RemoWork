import {
  useFeatureFlag,
  UseFeatureFlagOptions,
  FeatureFlagAs,
  IFeatureFlag,
  FeatureFlagAsTypeCheck,
} from '../hooks';

interface FeatureFlagProps<T extends FeatureFlagAs = 'boolean'> {
  name: string;
  options?: UseFeatureFlagOptions<T>;
  children?: (flag?: IFeatureFlag<FeatureFlagAsTypeCheck<T>>) => React.ReactNode;
}

export const FeatureFlag = <T extends FeatureFlagAs>({
  children,
  name,
  options,
}: FeatureFlagProps<T>) => {
  const flag = useFeatureFlag<T>(name, options);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children?.(flag)}</>;
};
