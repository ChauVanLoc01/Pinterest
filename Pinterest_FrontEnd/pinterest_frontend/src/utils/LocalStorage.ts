import LocalStorageConstant from 'src/constants/LocalStorage.constant'

type KeyType = keyof typeof LocalStorageConstant

type ObjectKeyType = {
  key: KeyType
  value: string
}

export default {
  getLocalStorage: (key: KeyType) => {
    return localStorage.getItem(key)
  },
  saveIntoLocalStorage: (key: ObjectKeyType[]) => {
    return key.forEach((e) => localStorage.setItem(e.key, e.value))
  },
  deleteOneLocalStorage: (key: KeyType) => {
    return localStorage.removeItem(key)
  },
  deleteAllLocalStorage: () => {
    return localStorage.clear()
  }
}
