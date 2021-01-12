const { src, dest } = require('gulp')
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const exec = require('child_process').exec;

function cleanBuild(){
  return src(['./lib'], {allowEmpty: true}).pipe(clean({force: true}))
}

function cleanBuildAfter(){
  return src(['../lib/use*'], {allowEmpty: true})
        .pipe(clean({force: true}))
}

function concatTypeFile(cb){
  return exec('yarn concat:types', function(err, stdout, stderr){
    console.log(stdout, stderr)
    cb(err);
  })
}


function joinTypeFile(){
  return src(['./src/**/**.d.ts', `./lib/**/**.d.ts`])
          .pipe(concat('index.d.ts')) 
          .pipe(dest('./lib/'))
}

function rollupBuild(cb){
  return exec('yarn build:rollup', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
} 


module.exports = {
  cleanBuild,
  concatTypeFile,
  joinTypeFile,
  rollupBuild,
  cleanBuildAfter
}