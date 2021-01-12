const { series, watch } = require('gulp')
const {
  cleanBuild,
  concatTypeFile,
  joinTypeFile,
  rollupBuild,
  cleanBuildAfter
} = require('./task')

function dev(){
  watch(['../src/**/**'], series(rollupBuild, concatTypeFile, joinTypeFile, cleanBuildAfter))
}

exports.default = dev
