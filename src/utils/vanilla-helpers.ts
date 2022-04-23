export function objectEntries<T extends string | number | symbol, K = any>(obj: { [key in T]?: K }){
  return Object.entries<K>(obj).map(([key, item]: [string, K]): [T, K] => [key as T, item])
}