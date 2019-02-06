<template>
    <div>
        <div v-if="!!isLoading" class="spinner"></div>
        <div v-else-if="!!isError" class="box">
            There was an error while loading the resource, sorry.
        </div>
        <slot v-else />
    </div>
</template>

<script>
    export default {
        name: "LoadingStatus",
        props: {
            isLoading: { type: Boolean, default: false },
            isError: { type: Boolean, default: false }
        }
    }
</script>

<style scoped lang="scss">
    .spinner {
        width: 40px;
        height: 40px;
        margin: 100px auto;
        background-color: $c-primary;

        border-radius: 100%;
        animation: sk-scaleout 1.0s infinite ease-in-out;
    }

    @keyframes sk-scaleout {
        0% {
            transform: scale(0);
        } 100% {
              transform: scale(1.0);
              opacity: 0;
          }
    }
</style>
