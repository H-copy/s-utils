import { ref } from 'vue'

export function useDebounceFn<T extends (...args:any) => any>(fn: T, wait: number):
{
  run: (...args: any) => void;
  cancel: () => void;
} {
  const timer = ref<any>()

  const cancel = () => {
    timer.value && clearTimeout(timer.value)
  }

  const run = (...args:any) => {
    cancel()
    timer.value = setTimeout(() => fn.apply(fn, args), wait * 1000)
  }

  return {
    run,
    cancel
  }
}