/**
 * @class
 * Represents WrongTypeError.
 * Intended to be invoked when the type of an element is not the same as the expected type
 */
export class WrongTypeError extends Error {
    constructor(message = 'Wrong type is given.') {
        super(message)
        this.name = WrongTypeError.name
    }
}

/**
 * Attaches a handler to the window scroll event and removes it when element is shown.
 * @param element {HTMLElement} An HTML element for the event
 * @param func {Function} A function to be fired when the element is shown on the viewport
 * @param __testSuite__ {{_w: number, _y: number}} A unique object for unit testing
 */
export function onShow(element, func, __testSuite__ = undefined) {
    if (!(element instanceof HTMLElement)) {
        return () =>
            throw new WrongTypeError('element must be type of HTMLElement.')
    }
    if (!(func instanceof Function)) {
        return () => throw new WrongTypeError('func must be type of Function.')
    }
    if (!(__testSuite__ instanceof Object) && __testSuite__ !== undefined) {
        return () =>
            throw new WrongTypeError(
                '__testSuite__ must be either type of object or undefined.'
            )
    }
    let f
    window.addEventListener(
        'scroll',
        (f = () => {
            const windowHeightValue = __testSuite__
                ? __testSuite__._w
                : window.innerHeight
            const selectedComponentRelativeTopValue = __testSuite__
                ? __testSuite__._y
                : element.getBoundingClientRect().y
            if (windowHeightValue >= selectedComponentRelativeTopValue) {
                func()
                window.removeEventListener('scroll', f)
            }
        })
    )
    f()
}
