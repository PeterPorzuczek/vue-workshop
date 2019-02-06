import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { getAllProducts, getProductById, updateProduct } from '../productService'

const store = {
    state: {
        products: [],
        productStatus: {},
        currentProductStatus: {},
        saveProductStatus: {},
        // 3. Podejście vuex dla notyfikacji
        notifications: []
    },
    getters: {
        products: (state) => state.products,
        saveProductStatus: (state) => state.saveProductStatus,
        currentPageNumber: (state, getters, rootState) => {
            if (rootState.route && rootState.route.params.page) {
                return +rootState.route.params.page
            }
            return 1
        },
        productStatus: (state) => state.productStatus,
        currentProductStatus: (state) => state.currentProductStatus,
        currentProductId: (state, getters, rootState) => {
            if (rootState.route && rootState.route.params.productId) {
                return +rootState.route.params.productId
            }
            return 1
        },
        currentProduct: (state, getters) => state.products.find((product) => product.id === getters.currentProductId),
        // 3. Podejście vuex dla notyfikacji
        notifications: (state) => state.notifications
    },
    mutations: {
        updateProducts (state, newProducts) {
            state.products = newProducts;
        },
        updateProductsStatus (state, newProductStatus) {
            state.productStatus = newProductStatus
        },
        updateOrAddProduct (state, newProduct) {
            const productIndex = state.products.findIndex((product) => product.id === newProduct.id)
            if (productIndex >= 0) {
                state.products.splice(productIndex, 1, newProduct)
            } else {
                state.products.push(newProduct)
            }
        },
        changeCurrentProductStatus (state, newCurrentProductStatus) {
            state.currentProductStatus = newCurrentProductStatus;
        },
        changeSaveProductStatus(state, newSaveProductStatus) {
            state.saveProductStatus = newSaveProductStatus;
        },
        // 3. Podejście vuex dla notyfikacji
        updateNotifications (state, notification) {
            state.notifications.push(notification)
        }
    },
    actions: {
        async fetchCurrentProduct ({ commit, dispatch, getters }) {
            commit("changeCurrentProductStatus", { loading: true })

            try {
                const product = await getProductById(getters.currentProductId)
                commit("updateOrAddProduct", product)
                commit("changeCurrentProductStatus", { loading: false })

            } catch (ex) {
                commit("changeCurrentProductStatus", { error: ex })
            }
        },
        async saveProduct ({ commit }, newProduct) {
            commit("changeSaveProductStatus", { loading: true })

            try {
                const product = await updateProduct(newProduct)
                commit("updateOrAddProduct", product)
                commit("changeSaveProductStatus", { loading: false })

            } catch (ex) {
                commit("changeSaveProductStatus", { error: ex })
            }
        },
        updateProducts ({ commit }, newProducts) {
            commit("updateProducts", newProducts)
            commit("updateProductsStatus", { loading: false })
        },
        async fetchProducts ({ commit, dispatch, getters }, newProducts) {
            commit("updateProductsStatus", { loading: true })

            try {
                const products = await getAllProducts(getters.currentPageNumber)
                dispatch("updateProducts", products && products.length > 0 ?
                    products : [])

            } catch (ex) {
                dispatch("updateProducts", [])
                commit("updateProductsStatus", { error: ex })
            }
        },
        // 3. Podejście vuex dla notyfikacji
        updateNotifications ({ commit }, newNotification) {
            commit("updateNotifications", newNotification)
        },
    }
}

export default new Vuex.Store(store)
export {store}
