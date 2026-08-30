import { NativeModules } from 'react-native'

import { CppBridge, NativeZanoModule } from './CppBridge'

export function makeZano(): CppBridge {
  const { ZanoModule } = NativeModules
  if (ZanoModule == null) {
    throw new Error('zano-native native module not linked')
  }
  return new CppBridge(ZanoModule)
}

export type { CppBridge, NativeZanoModule }
export * from './types'
