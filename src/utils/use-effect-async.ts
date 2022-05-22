import { useEffect } from "react"

export function useEffectAsync(effect: () => Promise<ReturnType<React.EffectCallback>>, deps?: React.DependencyList): void {
  useEffect(() => { effect() }, deps)
}
