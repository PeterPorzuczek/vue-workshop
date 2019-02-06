import { mapActions } from "vuex";

const notifyMixin = {
    created() {
        if (this.$store && this.$store.state.route.from.fullPath.includes('edit')) {
            this.showMessage('Success baby :)')
        }
    },
    methods:{
        // 3. Podejście vuex dla notyfikacji (wymaga edycji stora i komponentu notify)
        ...mapActions({
            showMessage: "updateNotifications"
        }),
        //
        // 2. Podejście z globalnym eventem dla notyfikacji (wymaga w komponencie notify oczekiwania eventu
        //  also event jest emitowany kilka razy jezeli mixin jest globalny ale nie wpływa to na działanie)
        //
        // showMessageWithEvent (text) {
        //     this.$root.$emit('notify', text)
        // },
        //
        // 1. Podejscie z modyfikacją htmla dla notyfikacji
        //
        // showMessageHTMLImpl (text) {
        //     const element = document.createElement('div')
        //
        //     element.className = "notification"
        //     element.id = "notfication"
        //     element.innerHTML = `${text}`
        //
        //     document.body.prepend(element);
        //
        //     setTimeout(() => {
        //         document.body.removeChild(element)
        //     }, 5100);
        // }
    }
}

export default notifyMixin
