<template>
    <div>
        <section class="container" v-if="!productStatus.loading">
            <router-link class="btn" :to="{ path: '/', query: { page: page - 1 } }" v-show="!isFirstPage">Previous page</router-link>
            {{ page }}
            <router-link class="btn" :to="{ path: '/', query: { page: page + 1 } }" v-show="!isLastPage">Next page</router-link>
        </section>

        <loading-status :is-loading="productStatus.loading" :is-error="productStatus.error"/>

        <section v-show="!productStatus.loading">
            <ul class="product-list">
                <product-list-item v-for="(product, index) in products" :product="product" :index="index" :key="`product-${index}`"/>
            </ul>
        </section>

        <div v-if="isLastPage">
            You have reached the end
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import LoadingStatus from './LoadingStatus'
    import ProductListItem from './ProductsListItem'

    export default {
        name: "ProductsList",
        components: {
            ProductListItem,
            LoadingStatus
        },
        watch: {
            page: {
                immediate: true,
                handler () {
                    this.fetchProducts()
                }
            }
        },
        computed: {
            isFirstPage () {
                return this.page === 1
            },
            isLastPage () {
                return this.products.length === 0
            },
            ...mapGetters(["products"]),
            ...mapGetters(["productStatus"]),
            ...mapGetters({
                page: "currentPageNumber"
            }),
        },
        methods:{
            ...mapActions(["fetchProducts"])
        }
    }
</script>

<style scoped lang="scss">
    .product-list {
        list-style: none;
        padding: 0;
        margin: 0 0 0 (-$gutter);
        display: flex;
        flex-wrap: wrap;

        /deep/ &--product {
            $inRow: 4;
            flex-basis: calc(#{100%/$inRow} - #{$gutter});
        }
    }
</style>
