<template>
    <loading-status :is-loading="status.loading" :is-error="status.error">
        <article class="product" v-if="product">
            <img v-style-when-broken class="product--image" :src="product.photo" alt=""/>
            <div class="product--caption">
                <h1 class="product--name">
                    {{ product.name }}</h1>
                <div class="product--category">
                    Category: <a href="#">{{ product.department }}</a>
                </div>

                <p class="product--description">
                    {{ product.description }}</p>
                <dl class="product--attributes">
                    <dt>Color:</dt>
                    <dd>
                        <div class="color-swatch" :style="`background-color: ${product.color};`"></div>
                    </dd>
                    <dt>Materials:</dt>
                    <dd>
                        <ul class="product--materials">
                            <li v-for="material in product.materials">{{ material }}</li>
                        </ul>
                    </dd>

                    <dt>Availability:</dt>
                    <dd>{{ quantityDescription }}</dd>

                    <dt>Price:</dt>
                    <dd class="price">
                        {{ $options.filters.asCurrency(product.price) }} <span class="lozenge" v-show="product.price > 20">free shipping</span>
                    </dd>
                </dl>
            </div>
            <div class="product--footer">
                <div class="product--actions">
                    <router-link class="btn" :to="`/product/${id}/edit`">Edit product</router-link>
                </div>
            </div>
        </article>
    </loading-status>
</template>

<script>
    import LoadingStatus from './LoadingStatus'
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "ProductDetails",
        components: {
            LoadingStatus
        },
        computed: {
            quantityDescription () {
                return this.product.inStock === 0 ?
                    "out of stock" :  this.product.inStock > 5 ?
                        "plenty in stock" : "few in stock"
            },
            ...mapGetters({
                id: "currentProductId",
                status: "currentProductStatus",
                product: "currentProduct"
            }),
        },
        watch: {
            id: {
                immediate: true,
                handler () {
                    this.fetchCurrentProduct()
                }
            }
        },
        methods: {
            ...mapActions(["fetchCurrentProduct"])
        }
    }
</script>

<style scoped lang="scss">
    .product {
        @include box();
        @include clearfix();
        @include productCommons();

        &--image {
            position: relative;
            float: right;
            max-width: 300px;
            margin-left: $gutter;
            z-index: 1;
        }

        &--attributes {
            $verticalPadding: $gutter/3;
            position: relative;
            border-top: solid 1px #ccc;
            max-width: 400px;
            dt {
                padding: $verticalPadding;
                position: absolute;
                left: 0;
            }
            dd {
                margin: 0;
                padding: $verticalPadding $verticalPadding $verticalPadding 120px;

                border-bottom: solid 1px #ccc;

                ul {
                    margin: 0;
                    padding: 0 20px;
                }
            }
        }
    }

</style>
