const path = require('path')
const fs = require('fs')
let _ = require('lodash')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const dev = process.env.NODE_ENV === 'development'
const pagesPath = require(path.resolve(process.cwd(),'./pathConfig'))

let privateConfig
fs.exists(path.resolve(process.cwd(),'vue.config.js'),(exists)=>{
  if(exists){
    privateConfig = require(path.resolve(process.cwd(),'vue.config.js'))
  }
})

const modulepage = process.env.VUE_APP_Module
const cdn = {
  'work-flow': {
    css: [],
    js: [
      '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
      '//cdn.jsdelivr.net/npm/vue-router@3.0.6/dist/vue-router.min.js',
      '//cdn.jsdelivr.net/npm/vuex@3.1.0/dist/vuex.min.js',
      '//cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js',
      '//cdn.jsdelivr.net/npm/vant@1.6.16/lib/vant.min.js',
      '//cdn.jsdelivr.net/npm/weixin-js-sdk@1.4.0-test/index.original.js'
    ]
  }
}
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  vant: 'vant',
  'weixin-js-sdk': 'wx'
}
function mergeRule(publicValue, privateValue){
  if(publicValue){
    if(typeof privateValue === 'string' || typeof privateValue === 'boolean'){
      return privateValue
    }else if(_.isPlainObject(privateValue)){
      return Object.assign({},publicValue,privateValue)
    }else if(typeof privateValue === 'function'){
      return (config)=>{
        publicValue(config)
        privateValue(config)
      }
    }
  }else{
    return privateValue
  }
}
function replaceSvgLoader (config) {
  const svgRule = config.module.rule('svg')
  svgRule.uses.clear()
  svgRule
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .tap(options => {
      const newOptions = { ...options, symbolId: 'icon-[name]' }
      return newOptions
    })
}
let publicCofig = {
  publicPath: dev ? '/' : pagesPath[process.env.NODE_ENV] && pagesPath[process.env.NODE_ENV][modulepage] ? pagesPath[process.env.NODE_ENV][modulepage].publicPath : '/',
  productionSourceMap: false,
  outputDir: path.resolve(process.cwd(), `dist/${modulepage}`),
  css: {
    extract: true,
    sourceMap: false,
    modules: false
  },
  devServer: {
    proxy: pagesPath[process.env.NODE_ENV] && pagesPath[process.env.NODE_ENV][modulepage] ? pagesPath[process.env.NODE_ENV][modulepage].serviceURL : ''
  },
  configureWebpack: config => {
    Object.assign(config, {
      entry: path.join(process.cwd(), `./src/pages/${modulepage}/main.js`)
    })
    Object.assign(config.output, {
      filename: `js/[name]-[hash:8].js`,
      chunkFilename: `js/${modulepage}-[name]-[hash:8].js`
    })
    config.plugins.push(
      new SkeletonWebpackPlugin({
        webpackConfig: {
          entry: {
            main: path.join(process.cwd(), `./src/pages/${modulepage}/components/skeleton/index.js`)
          }
        },
        minimize: true,
        quiet: true
      })
    )
  },
  chainWebpack: (config) => {
    replaceSvgLoader(config)
    config.resolve.alias
      .set('src', path.resolve(process.cwd(),'src'))
      .set('@', path.resolve(process.cwd(),`src/pages/${modulepage}`))
      .set('assets', path.resolve(process.cwd(),`src/pages/${modulepage}/assets`))
    if (process.env.NODE_ENV === 'production') {
      config.externals(externals)
      config
        .plugin('compression')
        .use(CompressionPlugin, {
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240
        })
        .tap(() => {})
    }
    config
      .plugin('html')
      .tap(args => {
        args[0].template = path.join(process.cwd(), `./src/pages/${modulepage}/index.html`)
        if (process.env.NODE_ENV === 'production') {
          args[0].cdn = cdn[modulepage]
        }
        return args
      })
  }
}

let mergeConfig = publicCofig
if(privateConfig){
  mergeConfig = _.mergeWith(publicCofig,privateConfig,mergeRule)
}
module.exports = mergeConfig
