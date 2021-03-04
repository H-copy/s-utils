/** @internal */

export const dely = (time: number) => {
  return new Promise((reslove) => {
    setTimeout(reslove, time * 1000)
  })
}