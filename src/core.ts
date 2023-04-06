const styleReg = /<style[^>]+>(.*)<\/style>/s
const vbindReg = /(calc)?[\w\(]*(v-bind\([^)]+\))([^);}:]+)/g

export function vbindTransform(code: string) {
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
}
