import fsp from 'fs/promises'
import { describe, expect, it } from 'vitest'
import { vbindTransform } from '../src/core'

describe('vbindTransform Test', async () => {
  const dir = await fsp.readdir('./src/vue')
  await Promise.all(dir.map(async (item) => {
    const code = await fsp.readFile(`./src/vue/${item}`, 'utf-8')
    it(`${item}`, async () => {
      expect(vbindTransform(code)).toMatchSnapshot()
    })
  }))
})
