import axios, { AxiosRequestConfig } from 'axios'

export interface IAxiosHelper {
  setUrl (url: string) : IAxiosHelper
  setParams<T> (params: T) : IAxiosHelper
  setData<T> (data: T) : IAxiosHelper
  setConfig (config: AxiosRequestConfig) : IAxiosHelper
  mountGet<T> () : Promise<T>
  mountPost<T> () : Promise<T>
}

export interface IAxiosStore {
  url: string
  params: any // eslint-disable-line @typescript-eslint/no-explicit-any
  data: any // eslint-disable-line @typescript-eslint/no-explicit-any
  config: AxiosRequestConfig
}

function axiosHelper () : IAxiosHelper {
  const store : IAxiosStore = {
    url: '',
    params: undefined,
    data: undefined,
    config: undefined,
  }
  const helper : IAxiosHelper = {
    setUrl (url) {
      store.url = url
      return helper
    },
    setParams (params) {
      if (!store.params) {
        store.params = {}
      }
      Object.entries(params).forEach(([key, value]) => {
        store.params[key] = value
      })
      return helper
    },
    setData (data) {
      store.data = data
      return helper
    },
    setConfig (config) {
      store.config = config
      return helper
    },
    async mountGet () {
      return (await axios.get(store.url, {
        ...store.config,
        params: store.params
      })).data
    },
    async mountPost () {
      let url = store.url
      if (store.params) {
        const paramStrArr = []
        Object.entries(store.params).forEach(([key, value]) => {
          paramStrArr.push(`${key}=${value}`)
        })
        url = `${url}?${paramStrArr.join('&')}`
      }
      return (await axios.post(url, store.data, store.config)).data
    }
  }

  return helper
}

export default axiosHelper
