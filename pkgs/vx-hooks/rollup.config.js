import path from 'path'
import resolve from 'rollup-plugin-node-resolve' // 依赖引用插件
import commonjs from 'rollup-plugin-commonjs' // commonjs模块转换插件
import { eslint } from 'rollup-plugin-eslint' // eslint插件
import ts from 'rollup-plugin-typescript2'
const getPath = _path => path.resolve(__dirname, _path)
import packageJSON from './package.json'

const extensions = [
  '.js',
  '.ts',
  '.tsx'
]

const tsPlugin = ts({
  tsconfig: getPath('./tsconfig.json'),
  extensions
})

const esPlugin = eslint({
  throwOnError: true,
  include: ['src/**/*.ts'],
  exclude: ['node_modules/**', 'lib/**', 'src/**/__test__/**']
})

const commonConf = {
  input: getPath('./src/index.ts'),
  external: ['vue'],
  plugins:[
    resolve(extensions),
    commonjs(),
    esPlugin,
    tsPlugin,
  ],
  output: [
    { name: packageJSON.name,  globals:{ vue: 'vue' }, file: packageJSON.main, format: 'umd' },
    { name: packageJSON.name,  globals:{ vue: 'vue' }, file: packageJSON.module, format: 'es' },
  ]
}

export default commonConf