## Classes

<dl>
<dt><a href="#OnShowHandlerIsNotFound">OnShowHandlerIsNotFound</a></dt>
<dd><p>Represents OnShowHandlerIsNotFound.
Intended to be invoked when the core event handler is not found</p>
</dd>
<dt><a href="#OnShow">OnShow</a></dt>
<dd></dd>
<dt><a href="#WrongTypeError">WrongTypeError</a></dt>
<dd><p>Represents WrongTypeError.
Intended to be invoked when the type of an element is not the same as the expected type</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#onShow">onShow(element, func, __testSuite__)</a></dt>
<dd><p>Attaches a handler to the window scroll event and removes it when element is shown.</p>
</dd>
</dl>

<a name="OnShow"></a>

## OnShow
**Kind**: global class  
<a name="new_OnShow_new"></a>

### new exports.OnShow(handler, children)
Creates an OnShow React component.


| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> | A function to be invoked when the onShow event is triggered |
| children |  | The content that is sent inside the component |

<a name="onShow"></a>

## onShow(element, func, __testSuite__)
Attaches a handler to the window scroll event and removes it when element is shown.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | An HTML element for the event |
| func | <code>function</code> | A function to be fired when the element is shown on the viewport |
| __testSuite__ | <code>Object</code> | A unique object for unit testing |

