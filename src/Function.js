export function onShow(element, func) {
    window.addEventListener('scroll', function (func) {
        let lock = false
        const windowHeightValue = window.innerHeight
        const selectedComponentRelativeTopValue = element.getBoundingClientRect()
            .y

        if (
            windowHeightValue >= selectedComponentRelativeTopValue &&
            lock === false
        ) {
            lock = true
            func()
        }
    })
}
