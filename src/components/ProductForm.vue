<template>
    <loading-status :isLoading="status.loading" :isError="status.error">
        <p v-if="status.error">
            <span class="lozenge">ERROR</span> Could not save the product.
        </p>
        <form action="#" class="box product-edit" @submit.prevent="updateProduct">
            <h2>Edit product {{ currentProductId }}</h2>

            <div class="form-row">
                <label for="edit-name">Name</label>
                <input id="edit-name" type="text" v-model.trim="$v.formProduct.name.$model" />
            </div>

            <div class="form-row">
                <label for="edit-photo">Photo</label>
                <input id="edit-photo" type="text" v-model.lazy.trim="$v.formProduct.photo.$model" />
                <img v-style-when-broken class="photo-preview" :src="$v.formProduct.photo.$model" />
            </div>

            <div class="form-row">
                <label for="edit-desc">Description</label>
                <textarea id="edit-desc" v-model="$v.formProduct.description.$model"></textarea>
            </div>

            <div class="form-row">
                <label for="edit-color">Color</label>
                <input type="color" id="edit-color" v-model.trim="$v.formProduct.color.$model" />
            </div>

            <div class="form-row">
                <label>Materials</label>
                <div>
                    <label><input type="checkbox" v-model="$v.formProduct.materials.$model" value="Steel"/> Steel</label>
                    <label><input type="checkbox" v-model="$v.formProduct.materials.$model" value="Wooden"/> Wooden</label>
                    <label><input type="checkbox" v-model="$v.formProduct.materials.$model" value="Concrete"/> Concrete</label>
                    <label><input type="checkbox" v-model="$v.formProduct.materials.$model" value="Plastic"/> Plastic</label>
                    <label><input type="checkbox" v-model="$v.formProduct.materials.$model" value="Cotton"/> Cotton</label>
                    <label><input type="checkbox" v-model="$v.formProduct.materials.$model" value="Granite"/> Granite</label>
                    <label><input type="checkbox" v-model="$v.formProduct.materials.$model" value="Rubber"/> Rubber</label>
                    <label><input type="checkbox" v-model="$v.formProduct.materials.$model" value="Metal"/> Metal</label>
                    <label><input type="checkbox" v-model="$v.formProduct.materials.$model" value="Soft"/> Soft</label>
                    <label><input type="checkbox" v-model="$v.formProduct.materials.$model" value="Fresh"/> Fresh</label>
                    <label><input type="checkbox" v-model="$v.formProduct.materials.$model" value="Frozen"/> Frozen</label>
                </div>
            </div>

            <div class="form-row">
                <label for="edit-department">Department</label>
                <select id="edit-department" v-model="$v.formProduct.department.$model">
                    <option></option>
                    <option>Books</option>
                    <option>Movies</option>
                    <option>Music</option>
                    <option>Games</option>
                    <option>Electronics</option>
                    <option>Computers</option>
                    <option>Home</option>
                    <option>Garden</option>
                    <option>Tools</option>
                    <option>Grocery</option>
                    <option>Health</option>
                    <option>Beauty</option>
                    <option>Toys</option>
                    <option>Kids</option>
                    <option>Baby</option>
                    <option>Clothing</option>
                    <option>Shoes</option>
                    <option>Jewelery</option>
                    <option>Sports</option>
                    <option>Outdoors</option>
                    <option>Automotive</option>
                    <option>Industrial</option>
                </select>
            </div>

            <div class="form-row">
                <label for="edit-stock">In stock</label>
                <input type="number" id="edit-stock" v-model.number="$v.formProduct.inStock.$model"/>
            </div>

            <div class="form-row">
                <label for="edit-price">Price</label>
                <input type="number" id="edit-price" v-model.number="$v.formProduct.price.$model"/>
            </div>

            <button type="submit" class="btn" :disabled="$v.$anyDirty === false || $v.$invalid">Save product</button>

            <span v-show="$v.$invalid" class="lozenge">All fields are required</span>
        </form>
    </loading-status>
</template>

<script>
    import LoadingStatus from './LoadingStatus'
    import {required, numeric} from 'vuelidate/lib/validators'

    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "ProductForm",
        components: {
            LoadingStatus
        },
        data() {
            return {
                formProduct: {},
            }
        },
        validations: {
            formProduct: {
                name: {required},
                description: {required},
                photo: {required},
                color: {required},
                materials: {required},
                department: {required},
                inStock: {required, numeric},
                price: {required, numeric}
            }
        },
        watch: {
            currentProductId: {
                handler: "fetchCurrentProduct",
                immediate: true
            },
            currentProduct() {
                this.formProduct = { ...this.currentProduct }
            }
        },
        computed: {
            ...mapGetters({
                currentProductId: "currentProductId",
                status: "currentProductStatus",
                currentProduct: "currentProduct",
                saveStatus: "saveProductStatus"
            }),
        },
        methods: {
            ...mapActions(["fetchCurrentProduct"]),
            ...mapActions(["saveProduct"]),
            async updateProduct () {
                if (!this.$v.$invalid) {
                    await this.saveProduct(this.formProduct)
                    if (!this.saveStatus.error) {
                        this.$router.push(`/product/${this.currentProductId}`)
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .form-row {
        $labelWidth: 150px;

        position: relative;
        padding-left: $labelWidth;
        margin-bottom: $gutter/2;

        & > label {
            position: absolute;
            margin-left: -$labelWidth;
            padding: 5px 3px;
        }
        label {
            display: block;
            margin-bottom: $gutter/6;
        }
    }

    .photo-preview {
        display: block;
        margin: $gutter/6 0;
        max-width: 300px;
        max-height: 300px;
    }
</style>
