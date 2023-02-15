module.exports = (api) => {
  const presets = ['next/babel', '@babel/preset-typescript']

  const plugins = [['styled-components', { ssr: true }]]

  if (api.env('test')) {
    plugins.concat(['transform-dynamic-import'])
  }

  return {
    presets,
    plugins,
  }
}
