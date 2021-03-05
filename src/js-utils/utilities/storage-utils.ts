export interface IStorageOptions {
  set<T> (key: string, value: T) : IStorageOptions
  get (key: string) : string | null
  getUseJSON<T> (key: string) : T | null
  remove (key: string) : IStorageOptions
  clear () : IStorageOptions
}

export interface IStorageUtils {
  local: IStorageOptions
  session: IStorageOptions
}

export const storageUtils : IStorageUtils = {

  local: {
    set<T> (key: string, value: T) : IStorageOptions {
      localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
      return storageUtils.local
    },
    get (key: string) : string | null {
      const value = localStorage.getItem(key)
      if (value) {
        return value
      } else {
        return null
      }
    },
    getUseJSON<T> (key: string) : T | null {
      const value = localStorage.getItem(key)
      if (value) {
        return JSON.parse(value)
      } else {
        return null
      }
    },
    remove (key: string) : IStorageOptions {
      localStorage.removeItem(key)
      return storageUtils.local
    },
    clear () : IStorageOptions {
      localStorage.clear()
      return storageUtils.local
    }
  },

  session:{
    set<T> (key: string, value: T) : IStorageOptions {
      sessionStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
      return storageUtils.session
    },
    get (key: string) : string | null {
      const value = sessionStorage.getItem(key)
      if (value) {
        return value
      } else {
        return null
      }
    },
    getUseJSON<T> (key: string) : T | null {
      const value = sessionStorage.getItem(key)
      if (value) {
        return JSON.parse(value)
      } else {
        return null
      }
    },
    remove (key: string) : IStorageOptions {
      sessionStorage.removeItem(key)
      return storageUtils.session
    },
    clear () : IStorageOptions {
      sessionStorage.clear()
      return storageUtils.session
    }
  },

}
