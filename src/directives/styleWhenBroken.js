export default function styleWhenBroken(el, binding) {
    el.classList.remove("broken-image");
    if (!el.onerror) {
        el.onerror = () => {
            el.classList.add("broken-image");
        };
    }
}
