import { RequestMethods } from 'types/common-types'
import { mockedData } from './mocked-data'

type RequestParams = {
  method: RequestMethods
  headers?: Record<string, string | number>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: Record<string, any> | null
}

export const fetchRequest = async <ReturnType>(
  url: URL,
  { method, headers = {}, body = null }: RequestParams,
): Promise<ReturnType> => {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  try {
    if (mockedData[url.toString()]) {
      return new Promise((resolve) =>
        setTimeout(
          () => resolve(mockedData[url.toString()] as ReturnType),
          1000,
        ),
      )
    }
    const response = await fetch(url, config)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const textData = (await response.text()) || '{}'

    const data = JSON.parse(textData)

    return data
  } catch (error) {
    console.error('There was an error with your request', error)
    throw error
  }
}
