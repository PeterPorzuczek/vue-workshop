<template>
    <nav class="navbar container">
        <router-link to="/" class="navbar--brand">{{ name }}</router-link>
        <ul class="navbar--menu">
            <li class="active"><router-link to="/a">Somewhere</router-link></li>
            <li class="active"><router-link to="/b">Over</router-link></li>
            <li class="active"><router-link to="/c">The rainbow</router-link></li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: "Navbar",
        data () {
            return {
                name: 'Vue.js (work)shop'
            }
        }
    }
</script>

<style scoped lang="scss">
    .navbar {
        @include box();
        line-height: 30px;
        @include clearfix();

        &--brand {
            font-size: 20px;
            float: left;
            margin-right: $gutter;
            color: $c-black;
            &:hover {
                text-decoration: none;
            }
        }

        &--menu {
            float: left;
            list-style: none;
            padding: 0;
            margin: 0;

            li {
                display: inline-block;
                margin-right: $gutter/2;
            }
        }
    }
</style>
