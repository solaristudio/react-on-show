import { onShow, enableTestMode } from '../src/react-on-show'

describe('Test Suite for onShow', () => {
    const testObject = enableTestMode()

    it('should fire the onShown event function', () => {
        const element = document.createElement('div')
        let value = 0
        const f = () => ++value
        testObject.windowHeight = 180
        testObject.ComponentClientRect.y = 150
        onShow(element, f, {
            offset: 30
        })
        expect(value).toBe(1)
    })
})
