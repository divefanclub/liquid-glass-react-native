# liquid-glass-react-native

A React Native library that provides cross-platform glass effect components.

## Features

- **iOS 26+**: Uses native `UIGlassEffect` to provide true glass effects
- **iOS < 26 & Android**: Uses React Native implementation to provide similar glass effects with semi-transparent backgrounds
- **Cross-platform compatibility**: Automatically detects platform and version to choose the appropriate implementation
- **Configurable**: Supports custom colors, appearance, and interactivity

## Installation

```bash
yarn add liquid-glass-react-native
```

### iOS

For iOS, you'll need to install the pods:

```sh
cd ios && pod install
```

### Android

No additional setup required for Android.

## Usage

### Basic Usage

```jsx
import { LiquidGlassView } from 'liquid-glass-react-native';

function MyComponent() {
  return (
    <LiquidGlassView style={styles.glassContainer}>
      <Text style={styles.text}>Hello Glass World!</Text>
    </LiquidGlassView>
  );
}

const styles = StyleSheet.create({
  glassContainer: {
    width: 200,
    height: 100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 16,
    fontWeight: '500',
  },
});
```

### Advanced Usage with Custom Options

```jsx
import { LiquidGlassView, type GlassEffectAppearance } from 'liquid-glass-react-native';

function AdvancedGlassComponent() {
  return (
    <LiquidGlassView
      tintColor="#094ECF"
      isInteractive={true}
      appearance="light"
      useNative={true}
      style={styles.glassButton}
    >
      <Text style={styles.buttonText}>Interactive Glass Button</Text>
    </LiquidGlassView>
  );
}
```

## API Reference

### LiquidGlassView Props

| Prop            | Type                             | Default     | Description                                                     |
| --------------- | -------------------------------- | ----------- | --------------------------------------------------------------- |
| `tintColor`     | `string`                         | `undefined` | Custom tint color for the glass effect                          |
| `isInteractive` | `boolean`                        | `false`     | Enables interactive animations and hover effects (iOS 26+ only) |
| `appearance`    | `'light' \| 'dark' \| 'default'` | `'default'` | Controls the glass effect appearance                            |
| `useNative`     | `boolean`                        | `true`      | Whether to use native implementation (recommended)              |
| `onPress`       | `() => void`                     | `undefined` | Touch event callback function                                   |
| `style`         | `ViewStyle`                      | -           | Standard React Native style props                               |

### GlassEffectAppearance

- `'light'`: Light glass effect with subtle transparency
- `'dark'`: Dark glass effect with more pronounced shadows
- `'default'`: Automatic appearance based on system theme

## Platform Compatibility

| Platform | Version      | Implementation       | Features                                   |
| -------- | ------------ | -------------------- | ------------------------------------------ |
| iOS      | 26+          | Native UIGlassEffect | Full functionality including interactivity |
| iOS      | < 26         | React Native         | Basic glass effect                         |
| Android  | All versions | React Native         | Basic glass effect                         |

## Examples

### Glass Card Component

```jsx
function GlassCard({ title, content }) {
  return (
    <LiquidGlassView
      appearance="light"
      isInteractive={true}
      style={styles.card}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </LiquidGlassView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: 'rgba(0,0,0,0.8)',
  },
  content: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
    lineHeight: 20,
  },
});
```

### Floating Action Button

```jsx
function FloatingActionButton({ onPress, icon }) {
  return (
    <LiquidGlassView
      tintColor="#007AFF"
      isInteractive={true}
      appearance="default"
      style={styles.fab}
      onPress={onPress}
    >
      {icon}
    </LiquidGlassView>
  );
}

const styles = StyleSheet.create({
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
});
```

## Requirements

- React Native >= 0.70.0
- iOS >= 12.0
- Android API level >= 21

## Development

### Running the Example

```sh
# Install dependencies
yarn install

# Run the example app
yarn example ios
# or
yarn example android
```

### Building

```sh
# Build the library
yarn prepare

# Run tests
yarn test

# Type checking
yarn typecheck
```

## Contributing

We welcome contributions! Please see our [contributing guide](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and contribute to the development workflow.

## License

MIT © [dive.fan](https://dive.fan)

---

Made with ❤️ using [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
