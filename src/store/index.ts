import { createStore, GetterTree, MutationTree, ActionTree } from "vuex";
import { storage } from "@/data/storage";
import { StorageItem, StorageFolder } from "@/types/storage";

interface RootState {
  storage: StorageItem[];
}

const getters: GetterTree<RootState, RootState> = {
  findStorageItemById:
    (state) =>
    (id: number): StorageItem | null => {
      const findItem = (items: StorageItem[]): StorageItem | null => {
        for (const item of items) {
          if (item.id === id) {
            return item;
          }
          if (item.type === 1 && (item as StorageFolder).children) {
            const foundChild = findItem((item as StorageFolder).children);
            if (foundChild) {
              return foundChild;
            }
          }
        }
        return null;
      };

      return findItem(state.storage);
    },
};

const mutations: MutationTree<RootState> = {
  updateStorageItemName: (
    state,
    payload: { storageItem: StorageItem; name: string }
  ): void => {
    const { storageItem, name } = payload;
    if (storageItem) {
      storageItem.name = name;
    }
  },
  deleteStorageItemById: (state, id: number): void => {
    const findAndRemoveItem = (items: StorageItem[]): boolean => {
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
          items.splice(i, 1);
          return true;
        }
        if (items[i].type === 1 && (items[i] as StorageFolder).children) {
          const foundAndRemovedChild = findAndRemoveItem(
            (items[i] as StorageFolder).children
          );
          if (foundAndRemovedChild) {
            return true;
          }
        }
      }
      return false;
    };

    findAndRemoveItem(state.storage);
  },
};

const actions: ActionTree<RootState, RootState> = {
  updateStorageItemName: (
    { commit, getters },
    payload: { id: number; name: string }
  ): void => {
    const storageItem = getters.findStorageItemById(payload.id);
    if (storageItem) {
      commit("updateStorageItemName", { storageItem, name: payload.name });
    }
  },

  deleteStorageItemById: ({ commit, getters }, id: number): void => {
    const storageItem = getters.findStorageItemById(id);
    if (storageItem) {
      commit("deleteStorageItemById", id);
    }
  },
};

export default createStore({
  state: {
    storage: [...storage],
  },
  getters,
  mutations,
  actions,
  modules: {},
});
