import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import { vbindTransform } from './core'
import type { Options } from './types'

const unplugin = createUnplugin((options: Options = {}): any => {
  const filter = createFilter(options.include, options.exclude)
  return [
    {
      name: 'unplugin-v-bind',
      enforce: 'pre',
      transformInclude(id: string) {
        return filter(id)
      },
      async transform(code: string, id: string) {
        // 只处理.vue文件
        if (!id.endsWith('.vue'))
          return code
        return vbindTransform(code)
      },
      handleHotUpdate({ file, server }: any) {
        if (file.endsWith('.vue')) {
          console.log('reloading vue file...')
          server.ws.send({
            type: 'full-reload',
            path: '*',
          })
        }

        return []
      },
    },
  ]
})

export const vitePlugin = unplugin.vite
export const rollupPlugin = unplugin.rollup
export const webpackPlugin = unplugin.webpack
export const esbuildPlugin = unplugin.esbuild
