<script lang="jsx">
    import asCurrency from '/src/filters/asCurrency'

    export default {
        name: "ProductsListItem",
        props: {
            product: { type: Object, default: () => {} }
        },
        render(h) {
            return (
                <li class={{ 'product-list--product': true, 'highlight': this.product.price < 300 }}>
                    <div class="ribbon" style={{ color: this.product.color }} />
                    <img class="product-list--product--image" src={this.product.photo} alt="" v-style-when-broken/>
                    <div class="product-list--product--caption">
                        <h4 class="product-list--product--name">
                            { this.product.name }
                        </h4>
                        <p class="product-list--product--description">
                            { this.product.description }
                        </p>
                    </div>

                    { this.product.inStock === 0 ?
                        <div class="product-list--product--footer">
                                <span class="lozenge">
                                    out of stock
                                </span>
                        </div>
                        :
                        <div class="product-list--product--footer">
                            <p class="product-list--product--price price">
                                {asCurrency(this.product.price)} <span class="lozenge"
                                                                        v-show="this.product.price > 20">free shipping</span>
                            </p>
                            <div class="product-list--product--actions">
                                <router-link class="btn" to={`/product/${this.product.id}`}>View product</router-link>
                            </div>
                        </div>
                    }

                </li>
            );
        },
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
