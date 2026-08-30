declare module 'react-native' {
  import type { NativeZanoModule } from 'zano-native'
  declare const NativeModules: {
    ZanoModule: NativeZanoModule
  }
}
