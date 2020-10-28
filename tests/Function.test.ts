import { onShow } from '../src/react-on-show'

describe('Test Suite for Function', () => {
    it('should fire the onShown event function', () => {
        const element = document.createElement('div')
        let value = 0
        const f = () => ++value
        const __testSuite__ = {
            _w: 120,
            _y: 120
        }
        onShow(element, f, __testSuite__)
        expect(value).toBe(1)
    })
})
