import { strict as assert } from 'assert'
import { readFileSync } from 'fs'
import { join } from 'path'

// Node loads this spec as an ES module, which has no __dirname, while the
// CommonJS tsconfig rules out import.meta. mocha runs from the package root.
const scripts = join(process.cwd(), 'scripts')

/**
 * The mobile build pins zano_native_lib in `update-sources.ts`, which tracks
 * upstream react-native-zano. The Node build pins it separately in
 * `build-native-host.ts`, which upstream does not have, so an upstream bump
 * moves only the first. Two pins means the phones and the CLI can end up on
 * different consensus rules — after a hard fork, different chains.
 */
function pinIn(file: string, pattern: RegExp): string {
  const match = pattern.exec(readFileSync(join(scripts, file), 'utf8'))
  if (match == null) throw new Error(`No zano_native_lib pin found in ${file}`)
  return match[1]
}

describe('zano_native_lib pin', () => {
  it('is the same for the mobile and Node builds', () => {
    const mobile = pinIn(
      'update-sources.ts',
      /'zano_native_lib',\s*'[^']+',\s*'([0-9a-f]{40})'/
    )
    const node = pinIn(
      'build-native-host.ts',
      /const zanoNativeHash = '([0-9a-f]{40})'/
    )
    assert.equal(node, mobile)
  })
})
