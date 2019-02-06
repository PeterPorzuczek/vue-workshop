import { mount, RouterLinkStub } from '@vue/test-utils'
import Navbar from './Navbar'

describe('Navbar', () => {
    it('to match snapshot', () => {
        const wrapper = mount(Navbar, { stubs: {
            RouterLink: RouterLinkStub
        }});

        expect(wrapper.html()).toMatchSnapshot();
    });
})
