import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { ViewProps } from 'react-native';
import type { WithDefault } from "react-native/Libraries/Types/CodegenTypes";

export type GlassEffectAppearance = "light" | "dark" | "default";

export interface NativeProps extends ViewProps {
  tintColor?: string;
  isInteractive?: boolean;
  appearance?: WithDefault<GlassEffectAppearance, "default">;
  useNative?: WithDefault<boolean, true>;
}

export default codegenNativeComponent<NativeProps>('LiquidGlassView'); 