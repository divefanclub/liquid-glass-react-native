import {
  LiquidGlassView,
  type GlassEffectAppearance,
} from 'liquid-glass-react-native';
import { useState } from 'react';
import {
  Text,
  ImageBackground,
  View,
  Switch,
  SafeAreaView,
  Image,
  Modal,
  ScrollView,
} from 'react-native';

export default function App() {
  const [options, setOptions] = useState({
    useNative: true,
    isInteractive: true,
    tintColor: undefined as string | undefined,
    appearance: 'default' as GlassEffectAppearance,
    darkBackground: false,
  });
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ImageBackground
        source={{
          uri: options.darkBackground
            ? 'https://mirri.link/WaAjB3A'
            : 'https://mirri.link/JrjGa8e',
        }}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ScrollView>
          <SafeAreaView style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                padding: 16,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <LiquidGlassView
                isInteractive={options.isInteractive}
                tintColor={options.tintColor}
                useNative={options.useNative}
                appearance={options.appearance}
                style={{
                  width: 200,
                  height: 56,
                  marginVertical: 20,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    color: options.darkBackground
                      ? 'rgba(255,255,255,0.8)'
                      : 'rgba(0,0,0,0.8)',
                    fontSize: 17,
                    fontWeight: '500',
                  }}
                >
                  Liquid Glass View
                </Text>
              </LiquidGlassView>
              <LiquidGlassView
                isInteractive={options.isInteractive}
                tintColor={options.tintColor}
                useNative={options.useNative}
                appearance={options.appearance}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  source={{ uri: 'https://mirri.link/jfkbHkH' }}
                  style={{
                    width: 32,
                    height: 32,
                    tintColor: options.darkBackground
                      ? 'rgba(255,255,255,0.8)'
                      : 'rgba(0,0,0,0.8)',
                  }}
                />
              </LiquidGlassView>
            </View>
          </SafeAreaView>
        </ScrollView>

        <LiquidGlassView
          isInteractive={true}
          tintColor="#65a30d"
          useNative={options.useNative}
          appearance={options.appearance}
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 24,
            right: 24,
          }}
          onTouchEnd={() => {
            setModalVisible(true);
          }}
        >
          <Image
            source={{ uri: 'https://mirri.link/r-fQpPR' }}
            style={{
              width: 32,
              height: 32,
              tintColor: options.darkBackground
                ? 'rgba(255,255,255,0.8)'
                : 'rgba(0,0,0,0.8)',
            }}
          />
        </LiquidGlassView>
      </ImageBackground>
      <Modal animationType="slide" visible={modalVisible}>
        <ScrollView>
          <SafeAreaView style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              <View
                style={{
                  padding: 20,
                  gap: 16,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 30,
                  }}
                >
                  <Switch
                    value={options.useNative}
                    onValueChange={(value) =>
                      setOptions({ ...options, useNative: value })
                    }
                  />
                  <Text>Use native: {options.useNative ? 'yes' : 'no'}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 30,
                  }}
                >
                  <Switch
                    value={options.isInteractive}
                    onValueChange={(value) =>
                      setOptions({ ...options, isInteractive: value })
                    }
                  />
                  <Text>
                    Interactive: {options.isInteractive ? 'yes' : 'no'}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 30,
                  }}
                >
                  <Switch
                    value={options.appearance === 'dark'}
                    onValueChange={(value) =>
                      setOptions({
                        ...options,
                        appearance: value
                          ? 'dark'
                          : ('light' as GlassEffectAppearance),
                      })
                    }
                  />
                  <Text>Appearance: {options.appearance}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 30,
                  }}
                >
                  <Switch
                    value={!!options.tintColor}
                    onValueChange={(value) =>
                      setOptions({
                        ...options,
                        tintColor: value ? '#094ECF' : undefined,
                      })
                    }
                  />
                  <Text>Tint Color: {options.tintColor || 'none'}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 30,
                  }}
                >
                  <Switch
                    value={options.darkBackground}
                    onValueChange={(value) =>
                      setOptions({ ...options, darkBackground: value })
                    }
                  />
                  <Text>Dark Background</Text>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
        <LiquidGlassView
          tintColor="#e11d48"
          isInteractive={true}
          useNative={options.useNative}
          appearance={options.appearance}
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 24,
            right: 24,
          }}
          onTouchEnd={() => {
            setModalVisible(false);
          }}
        >
          <Image
            source={{ uri: 'https://mirri.link/MYg805E' }}
            style={{
              width: 32,
              height: 32,
              tintColor: options.darkBackground
                ? 'rgba(255,255,255,0.8)'
                : 'rgba(0,0,0,0.8)',
            }}
          />
        </LiquidGlassView>
      </Modal>
    </View>
  );
}
