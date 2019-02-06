import { shallowMount } from "@vue/test-utils";
import LoadingStatus from './LoadingStatus'

describe('LoadingStatus component', () => {
    test('When slot is passed then slot content shall be rendered', () => {
        const slotContent = '<span>header-slot-content</span>'

        const {element} = shallowMount(LoadingStatus, {
            props: {isLoading: false},
            slots: {
                default: slotContent,
            }
        })

        expect(element.innerHTML).toContain(slotContent)
    })
})
