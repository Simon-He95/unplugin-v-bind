import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import type { Options } from './types'

const unplugin = createUnplugin((options: Options = {}): any => {
  const filter = createFilter(options.include, options.exclude)
  const styleReg = /<style[^>]+>(.*)<\/style>/s
  const vbindReg = /(calc)?[\w\(]*(v-bind\([^)]+\))([^);}:]+)/g
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
        const match = code.match(styleReg)
        if (!match)
          return code
        const _class = match[1]
        // 匹配是否有v-bind()
        for (const item of _class.matchAll(vbindReg)) {
          const [origin, jump = '', vbind, computed] = item
          if (jump)
            continue
          const calc = computed.trim().replace(/\s+/, ' ').split(' ').filter(Boolean)
          if (!calc.length)
            continue
          const _calc = calc.length === 1
            ? `calc(${vbind} * 1${calc[0]})`
            : `calc(${vbind} ${calc.join(' ')})`
          const replacer = jump + vbind + computed
          code = code.replace(origin, origin.replace(replacer, _calc))
        }
        return code
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
