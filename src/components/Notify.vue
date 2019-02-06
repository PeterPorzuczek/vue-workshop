<template>
    <div class="notify" v-if="show">{{ text }}</div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "Notify",
        data() {
            return {
                text: '',
                show: false
            }
        },
        // 2. Podejście z globalnym eventem dla notyfikacji
        // created() {
        //     this.$root.$on('notify', this.showNotification);
        // },
        // beforeDestroy() {
        //     this.$root.$off('notify');
        // },
        // 3. Podejście vuex dla notyfikacji
        watch: {
            notifications() {
                this.showNotification(this.notifications[this.notifications.length-1])
            }
        },
        computed: {
            ...mapGetters({
                notifications: "notifications"
            }),
        },
        methods: {
            showNotification(text) {
                this.text = text
                this.show = true

                setTimeout(() => {
                    this.show = false
                }, 5000);
            }
        }
    }
</script>

<style scoped>
    .notify {
        position: fixed;
        width: 200px;
        height: 90px;
        opacity: 0.8;
        z-index: 100;
        background: rgb(255, 255, 255);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px;
        color: rgb(70, 185, 131);
        border-bottom: 4px solid rgb(70, 185, 131);
        border-radius: 2px;
        box-shadow: 0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08);
    }
</style>
