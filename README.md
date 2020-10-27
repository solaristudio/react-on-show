<img src="header.svg" />

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) [![npm version](https://badge.fury.io/js/%40berakocc%2Fsaber.svg)](https://badge.fury.io/js/%40solariss%2Freact-on-show) ![Test](https://github.com/solaristudio/react-on-show/workflows/test/badge.svg?branch=main&event=push) ![Build](https://github.com/solaristudio/react-on-show/workflows/build/badge.svg?branch=main&event=push)

>`A library for adding event handler when an element is shown in React`

## `Install`
```bash
npm install @solariss/react-on-show
```

## `Usage`
There are two main way to use the library. You can use it either a function or a [Component](https://reactjs.org/docs/react-component.html).
```js
// Function based
import React from 'react'
import { onShow, OnShow } from '@solariss/react-on-show'
// Other imports

class MyComponent extends React.Component {
    component() {
        this.ref = React.createRef(null)
    }

    didComponentMound() {
        onShow(this.ref.current, () => {
            console.log('Event is triggered.')
        })
    }
    // ...
    <div ref={ref}>
        Hello World!
    </div>
    // ...
}
// Component Based

class MyComponent extends React.Component {
    <OnShow handler={() => {
        console.log('Event is triggered.')
    }}>
        <div>
            Hello World!
        </div>
    </OnShow>
}
```

## `Documentation`
A [GitHub Page](https://solaristudio.github.io/react-on-show) is dedicated for the project that contains a comprehensive and clear documentation.

## `Contributing`
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Also you can help me to improve the library by adding new [issues](https://github.com/solaristudio/react-on-show/issues).