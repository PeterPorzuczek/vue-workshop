<template>
    <div>
        Category: {{ category }}

        <loading-status :is-loading="isLoading"/>

        <section v-show="!isLoading && filteredProducts.length > 0">
            <ul class="product-list">
                <product-list-item v-for="(product, index) in filteredProducts" :product="product" :index="index" :key="`product-${index}`"/>
            </ul>
        </section>

        <div v-show="!isLoading && filteredProducts.length === 0">
            No products in category
        </div>
    </div>
</template>

<script>
    import LoadingStatus from './LoadingStatus'
    import ProductListItem from './ProductsListItem'
    import { getAllProducts } from "../productService";

    export default {
        name: "ProductsCategory",
        components: {
          LoadingStatus,
          ProductListItem
        },
        props: {
          category: { type: String, default: '' },
        },
        data() {
            return {
                products: [],
                isLoading: true
            }
        },
        watch: {
            category: {
                immediate: true,
                handler () {
                    this.reloadProducts()
                }
            }
        },
        computed: {
            filteredProducts () {
                const filteredProducts = this.products.length > 0
                    ? this.products.filter(product => product.department
                        .toLowerCase()
                        .includes(this.category.replace("-", " ").toLowerCase()))
                    : []

                return filteredProducts
            }
        },
        methods: {
            async reloadProducts () {
                this.isLoading = true
                try {
                    const products = await getAllProducts()
                    this.products = products && products.length > 0 ? products : []
                    this.isLoading = false
                } catch (ex) {
                    this.products = []
                    this.isLoading = false
                }
            },
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
