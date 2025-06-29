import { Platform } from 'react-native';

import NativeGlassEffectView from './LiquidGlassViewNativeComponent';
import type { NativeProps } from './LiquidGlassViewNativeComponent';
import { FallbackGlassEffectView } from './FallbackGlassEffectView';

export * from './LiquidGlassViewNativeComponent';

export const isNativeModuleAvailable =
  Platform.OS === 'ios' && Number(Platform.Version) >= 26;

export const LiquidGlassView = (props: NativeProps) => {
  if (isNativeModuleAvailable && props.useNative !== false) {
    return <NativeGlassEffectView {...props} />;
  }

  return <FallbackGlassEffectView {...props} />;
};
