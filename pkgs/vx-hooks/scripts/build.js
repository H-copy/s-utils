const { series } = require('gulp')

const {
  cleanBuild,
  concatTypeFile,
  joinTypeFile,
  rollupBuild,
  cleanBuildAfter
} = require('./task')

exports.default = series(cleanBuild, rollupBuild, concatTypeFile, joinTypeFile, cleanBuildAfter)
