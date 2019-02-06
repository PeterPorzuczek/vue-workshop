import VueRouter from "vue-router";

import ProductsList from './components/ProductsList'
import ProductDetails from './components/ProductDetails'
import ProductForm from './components/ProductForm'
import ProductsCategory from './components/ProductsCategory'

const idAsNumber = (r) => ({ id: +r.params.productId });

const routes = [
    { path: '/', component: ProductsList },
    { path: '/:page', component: ProductsList },

    { path: '/category/:categoryName', component: ProductsCategory,
        props: (r) => ({ category: r.params.categoryName }) },

    { path: '/product/:productId', component: ProductDetails },
    { path: '/product/:productId/edit', component: ProductForm }
]

const router = new VueRouter({
    routes
})

export default router
