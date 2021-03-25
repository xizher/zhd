import { baseUtils } from '../js-utils'

class AjaxStore {
  public url = ''
  public params = {}
  public data = {}
  public headers : HeadersInit = {
    'content-type': 'application/json'
  }
  public otherOptions = {}
  public clone () : AjaxStore {
    const _ajaxStore = new AjaxStore()
    _ajaxStore.url = this.url
    _ajaxStore.params = baseUtils.deepCopyJSON(this.params)
    _ajaxStore.data = baseUtils.deepCopyJSON(this.data)
    _ajaxStore.headers = baseUtils.deepCopyJSON(this.headers)
    _ajaxStore.otherOptions = baseUtils.deepCopyJSON(this.otherOptions)
    return _ajaxStore
  }
}

export interface IAjax {
  setUrl (url: string) : IAjax
  setParams<T> (params: T) : IAjax
  setData<T> (data: T) : IAjax
  setHeaders (headers: HeadersInit) : IAjax
  setOtherOptions (options: RequestInit) : IAjax
  mountGet () : Promise<Response>
  mountPost () : Promise<Response>
}

export function createAjax (store?: AjaxStore) : IAjax {
  const _store = store ?? new AjaxStore()
  function setUrl (url: string) {
    const newStore = _store.clone()
    newStore.url = url
    return createAjax(newStore)
  }
  function setParams<T> (params: T) {
    const newStore = _store.clone()
    Object.entries(params).forEach(([key, value]) => {
      newStore.params[key] = value
    })
    return createAjax(newStore)
  }
  function setData<T> (data: T) {
    const newStore = _store.clone()
    if (typeof data === 'string') {
      newStore.data = data
    } else {
      newStore.data = { ...newStore.data, ...data }
    }
    return createAjax(newStore)
  }
  function setHeaders (headers: HeadersInit) {
    const newStore = _store.clone()
    newStore.headers = { ...newStore.headers, ...headers }
    return createAjax(newStore)
  }
  function setOtherOptions (options: RequestInit) {
    const newStore = _store.clone()
    newStore.otherOptions = { ...newStore.otherOptions, ...options }
    return createAjax(newStore)
  }
  function mountGet () {
    const paramsStr = parseParamsToString(_store.params)
    const _url = paramsStr === '' ? `${store.url}?${paramsStr}` : store.url
    const body = JSON.stringify(store.data)
    return fetch(_url, {
      method: 'GET', body,
      headers: store.headers,
      ...store.otherOptions,
    })
  }
  function mountPost () {
    const paramsStr = parseParamsToString(_store.params)
    const _url = paramsStr === '' ? `${store.url}?${paramsStr}` : store.url
    let body = ''
    if (typeof store.data === 'string') {
      body = store.data
    } else {
      body = JSON.stringify(store.data)
    }
    return fetch(_url, {
      method: 'POST', body,
      headers: store.headers,
      ...store.otherOptions,
    })
  }

  return {
    setUrl,
    setParams,
    setData,
    setHeaders,
    setOtherOptions,
    mountGet,
    mountPost,
  }
}

function parseParamsToString<T> (params: T) : string {
  const paramStrArr = []
  Object.entries(params).forEach(([key, value]) => {
    paramStrArr.push(`${key}=${value}`)
  })
  return paramStrArr.join('&')
}
