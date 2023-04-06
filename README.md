## unplugin-v-bind
It is more convenient to use v-bind in vue

## e.g.
```vue
// use can direct use v-bind(move) with calculate
// you don't need to wrapper with calc()
// because the plugin will auto wrapper it with calc()
<style scoped>
.move{
  transform:translateX(v-bind(move)px);
  width: v-bind(move) * 10px;
}
</style>

<style scoped>
.move{
  transform:translateX(calc(v-bind(move) * 1px));
  width: calc(v-bind(move) * 10px);
}
</style>
```

## 🌈 Usage

<details>
<summary>Vite</summary>

```ts
// vite.config.ts
import { vitePlugin } from 'unplugin-v-bind'
export default defineConfig({
  plugins: [vitePlugin(/* options */)],
})
```

</details>
<br>
<details>
<summary>Rollup</summary>

```ts
// rollup.config.js
import { resolve } from 'path'
import { rollupPlugin } from 'unplugin-v-bind'
export default {
  plugins: [rollupPlugin(/* options */)],
}
```

</details>
<br>
<details>
<summary>Webpack</summary>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-v-bind').webpackPlugin({
      /* options */
    }),
  ],
}
```

</details>
<br>
<details>
<summary>Vue CLI</summary>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-v-bind').webpackPlugin({
        /* options */
      }),
    ],
  },
}
```

</details>
<br>
<details>
<summary>Esbuild</summary>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import { esbuildPlugin } from 'unplugin-v-bind'

build({
  plugins: [esbuildPlugin(/* options */)],
})
```

</details>


## License
[MIT](./LICENSE) License © 2022 [Simon He](https://github.com/Simon-He95)

<a href="https://github.com/Simon-He95/sponsor" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>


<span><div align="center">![sponsors](https://www.hejian.club/images/sponsors.jpg)</div></span>
