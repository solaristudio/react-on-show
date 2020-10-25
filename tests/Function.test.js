import { onShow, WrongTypeError } from '../src/Function'

describe('Test Suite for Function', () => {
    it('should throw errors when wrong argument types are given', () => {
        expect(onShow(null, () => true)).toThrow(WrongTypeError)
        expect(onShow(document.createElement('div'), false)).toThrow(WrongTypeError)
        expect(onShow(document.createElement('span'), () => ({}), true)).toThrow(WrongTypeError)
    })

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
