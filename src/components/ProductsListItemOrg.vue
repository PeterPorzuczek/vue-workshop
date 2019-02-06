<template>
    <li class="product-list--product" :class="{ 'highlight': product.price < 300 }">
        <div class="ribbon" :style="`color: ${product.color};`" />
        <img v-style-when-broken class="product-list--product--image" :src="product.photo" alt=""/>
        <div class="product-list--product--caption">
            <h4 class="product-list--product--name">
                {{ product.name }}</h4>
            <p class="product-list--product--description">
                {{ product.description }}
            </p>
        </div>
        <div class="product-list--product--footer">
            <p class="product-list--product--price price">
                {{ $options.filters.asCurrency(product.price) }} <span class="lozenge" v-show="product.price > 20">free shipping</span>
            </p>

            <template>

                <span class="lozenge" v-if="product.inStock === 0">
                    out of stock
                </span>

                <div class="product-list--product--actions" v-else>
                    <router-link class="btn" :to="`/product/${product.id}`">View product</router-link>
                </div>

            </template>
        </div>
    </li>
</template>

<script>
    export default {
        name: "ProductsListItem",
        props: {
            product: { type: Object, default: () => {} }
        }
    }
</script>

<style scoped lang="scss">
    .product-list--product {
        @include box();
        display: flex;
        flex-direction: column;
        margin-left: $gutter;

        &--description{
            font-size: 14px;
        }

        &--caption {
            flex: 1 1 auto;
        }

        @include productCommons();
    }
</style>
