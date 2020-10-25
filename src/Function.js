export function onShow(element, func) {
    let f
    window.addEventListener(
        'scroll',
        (f = () => {
            const windowHeightValue = window.innerHeight
            const selectedComponentRelativeTopValue = element.getBoundingClientRect()
                .y
            if (windowHeightValue >= selectedComponentRelativeTopValue) {
                func()
                window.removeEventListener('scroll', f)
            }
        })
    )
}
