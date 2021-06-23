import path from 'path'
import packageJSON from './package.json'
import pluginResolve from '@rollup/plugin-node-resolve' // 依赖引用插件
import pluginCommonjs from '@rollup/plugin-commonjs' // commonjs模块转换插件
import pluginEslint from '@rollup/plugin-eslint' // eslint插件
import pluginTypescript2 from 'rollup-plugin-typescript2'
import pluginTerser from 'rollup-plugin-terser'

const getPath = _path => path.resolve(__dirname, _path)

const extensions = [
  '.js',
  '.ts',
  '.tsx'
]

const eslintConf = {
  throwOnError: true,
  include: ['src/**'],
  exclude: ['node_modules/**', 'lib/**']
}

const  mini = {
  input: getPath('./src/index.ts'),
  plugins:[
    pluginEslint(eslintConf),
    pluginResolve(extensions),
    pluginCommonjs(),
    pluginTypescript2({
      tsconfig: getPath('./tsconfig.mini.json'),
      extensions
    }),
    pluginTerser.terser()
  ],
  output:{
    name: packageJSON.name,
    file: packageJSON.main,
    format: 'umd'
  }
}


const esm = {
  input: getPath('./src/index.ts'),
  plugins:[
    pluginEslint(eslintConf),
    pluginResolve(extensions),
    pluginCommonjs(),
    pluginTypescript2({
      tsconfig: getPath('./tsconfig.json'),
      extensions
    })
  ],
  output:{
    name: packageJSON.name,
    file: packageJSON.module,
    format: 'esm'
  }
}

export default [mini, esm]
