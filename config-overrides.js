
const path = require('path')
const { override, fixBabelImports, addWebpackAlias ,addPostcssPlugins} = require('customize-cra')
const px2viewport = require('postcss-px-to-viewport')
const CopyPlugin = require("copy-webpack-plugin");



const babelPlugins = fixBabelImports('import', {
  libraryName: 'antd-mobile',
  style: 'css',
})



// 配置 PostCSS 样式转换插件
const postcssPlugins = addPostcssPlugins([
    // 移动端布局 viewport 适配方案
    px2viewport({
      // 视口宽度：可以设置为设计稿的宽度
      viewportWidth: 375,
      // 白名单：不需对其中的 px 单位转成 vw 的样式类类名
      // selectorBlackList: ['.ignore', '.hairlines']
    })
  ])
// 导出要进行覆盖的 webpack 配置
module.exports = {'webpack': override(
  (config) => {
    config.output = {
      path: path.join(__dirname, process.env.BUILD||'./build'),
      publicPath: process.env.PUBLIC_URL||'',
      }
      config.resolve.alias={
        '@': path.resolve(__dirname, 'src'),
        '@scss': path.resolve(__dirname, 'src', 'assets', 'styles'),
      }
        config.plugins.push(
        new CopyPlugin({
          patterns: [
          {
          from: 'public',
          to: config.output.path,
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**.html'],
          },
          },
          ],
          }),
        
        )
    return config
  }),babelPlugins,
  postcssPlugins}