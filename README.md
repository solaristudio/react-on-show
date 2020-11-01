<a href="https://www.npmjs.com/package/@solariss/react-on-show"><img width="600" src="header.svg" /></a>

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) [![npm version](https://badge.fury.io/js/%40solariss%2Freact-on-show.svg)](https://badge.fury.io/js/%40solariss%2Freact-on-show) ![Build](https://github.com/solaristudio/react-on-show/workflows/build/badge.svg?branch=main&event=push)

>`A library for adding event handler when an element is shown in React`

> # Important Note
> Now the library has two versions: normal and minimal. For the normal version install `latest`. For the minimal version use `1.x.x` versioned packages. If you want to use the library just for basic onShow event(Like changing opacity when a div shows on the screen for the first time) use the minimal version since its size is very little compared to normal version.

## `Install`
For the latest version:
```bash
npm install @solariss/react-on-show
```
For the minimal version: 
```bash
npm install @solariss/react-on-show@1
```

## `Usage`
There are two main way to use the library. You can use it either a function or a [Component](https://reactjs.org/docs/react-component.html).

### `Latest`
```js
import React, { useRef, useEffect } from 'react'
import { onShow, OnShow } from '@solariss/react-on-show'

// Function based
function MyComponent(props) {
    const ref = useRef(null)
    useEffect(() => {
        onShow(ref.current, {
            enter: () => {
                console.log('Event is triggered.')
            }
        })
    })
    return (
        <div ref={ref}>
            Hello World!
        </div>
    )
}

// Component Based
function MyComponent(props) {
    return (<OnShow handlers={{
        enter: () => {
            console.log('Event is triggered.')
        }
    }}>
        <div>
            Hello World!
        </div>
    </OnShow>)
}
```
### `Minimal`
```js
import React, { useRef, useEffect } from 'react'
import { onShow, OnShow } from '@solariss/react-on-show'

// Function based
function MyComponent(props) {
    const ref = useRef(null)
    useEffect(() => {
        onShow(ref.current, () => {
            console.log('Event is triggered.')
        })
    })
    return (
        <div ref={ref}>
            Hello World!
        </div>
    )
}

// Component Based
function MyComponent(props) {
    return (<OnShow handler={() => {
        console.log('Event is triggered.')
    }}>
        <div>
            Hello World!
        </div>
    </OnShow>)
}
```

## `Documentation`
A [GitHub Page](https://solaristudio.github.io/react-on-show) is dedicated for the project that contains a comprehensive and clear documentation. You can also read [Changelogs](https://github.com/solaristudio/react-on-show/blob/main/changelogs.md) for detailed version updated.

## `Contributing`
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Also you can help me to improve the library by adding new [issues](https://github.com/solaristudio/react-on-show/issues).
