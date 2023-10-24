/* eslint-disable @typescript-eslint/no-extra-semi */
export const mergeRefs = <T = any>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>,
): React.RefCallback<T> => {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        ;(ref as React.MutableRefObject<T | null>).current = value
      }
    })
  }
}

export const adjustBrightness = (color: string, percent: number) => {
  if (color.charAt(0) === '#') {
    color = color.slice(1)
    const r = parseInt(color.slice(0, 2), 16)
    const g = parseInt(color.slice(2, 4), 16)
    const b = parseInt(color.slice(4, 6), 16)
    color = `rgb(${r}, ${g}, ${b})`
  }

  let [r, g, b] = (color.match(/\d+/g) ?? []).map(Number)

  r = Math.floor((r ?? 0) + (r ?? 0) * (percent / 100))
  g = Math.floor((g ?? 0) + (g ?? 0) * (percent / 100))
  b = Math.floor((b ?? 0) + (b ?? 0) * (percent / 100))

  r = Math.min(255, Math.max(0, r))
  g = Math.min(255, Math.max(0, g))
  b = Math.min(255, Math.max(0, b))

  const toHex = (c: number) => c.toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export type MatchOptions = {
  path: string
  exact?: boolean
}

export const matchPath = (
  currentPath: string,
  options: MatchOptions,
): boolean => {
  if (options.exact) {
    return currentPath === options.path
  }

  return currentPath.startsWith(options.path)
}

export const isDescendantOf = (child: HTMLElement, parent: HTMLElement) => {
  let node = child.parentNode
  while (node !== null) {
    if (node === parent) {
      return true
    }
    node = node.parentNode
  }
  return false
}

export const buildUrl = (
  baseUrl: string,
  endpoint: string,
  params: { [key: string]: string | number | boolean } = {},
): URL => {
  const url = new URL(endpoint, baseUrl)

  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    searchParams.append(key, value.toString())
  }

  url.search = searchParams.toString()

  return url
}

export const combineEndpoints = (endpoints: Array<string>) => endpoints.join('')

export const getUsernameFromEmail = (email: string) => {
  const [username] = email.split('@')
  return username
}

export const replaceArrayElementByIndex = <T = any>(
  array: Array<T>,
  element: T,
  index: number,
) => [...array.slice(0, index), element, ...array.slice(index + 1)]

export const arrayToHash = <T, G = unknown>(
  array: Array<T>,
  transformCallback: (arrayElement: T, index: number) => { [key: string]: T },
) =>
  array.reduce(
    (acc, arrayElement, index) => ({
      ...acc,
      ...transformCallback(arrayElement, index),
    }),
    {},
  ) as G

export const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)

export const runPromisesInSequence = async <T = any>(
  promisesCreators: Array<() => Promise<T>>,
  resultType: 'hash' | 'array',
  getter: (unit: T) => T[keyof T] | T = (unit) => unit,
) => {
  let results: Array<T[keyof T] | T> | { [key: string]: T[keyof T] | T } =
    resultType === 'hash' ? {} : []
  for (const promiseCreator of promisesCreators) {
    results =
      resultType === 'hash'
        ? { ...results, ...getter(await promiseCreator()) }
        : [
            ...(results as Array<T[keyof T] | T>),
            ...(getter(await promiseCreator()) as Array<T[keyof T] | T>),
          ]
  }
  return results
}

export const getUserDataFromCookie = () => {
  const userDataKeys = ['userId', 'email', 'displayName', 'picture']

  const data: { [key: string]: string } = {}

  userDataKeys.forEach((key) => {
    const regex = new RegExp(`(^| )${key}=([^;]+)`)
    const match = document.cookie.match(regex)
    if (match) {
      data[key] = match[2] ?? ''
    }
  })

  return data
}

export const computeCollectionsDifferences = <T>(
  before: Array<T>,
  after: Array<T>,
  getter: (entity: T) => T[keyof T],
): { toAdd: Array<T>; toDelete: Array<T> } => {
  const beforeKeys = new Set(before.map((entity) => getter(entity)))
  const afterKeys = new Set(after.map((entity) => getter(entity)))

  const toAdd = after.filter((entity) => !beforeKeys.has(getter(entity)))
  const toDelete = before.filter((entity) => !afterKeys.has(getter(entity)))

  return { toAdd, toDelete }
}
