<h1 align="center">
  <a href="https://github.com/devcut/interactive-board"><img width="200" src="/docs/assets/img/interactive-board.gif"></a>
  <br>
  Interactive Board :bookmark::flashlight:
</h1>

<p align="center">
  Interactive board is the lightweight (without dependencies) plugin to offer mouse interaction with your users.
</p>

<p align="center">
  <a href="#getting-started-arrow_down">Getting started</a>&nbsp;|&nbsp;<a href="#documentation-page_with_curl">Documentation</a>&nbsp;|&nbsp;<a href="https://devcut.github.io/interactive-board" target="_blank">Demos</a>
</p>

## Getting started :arrow_down:

### Download

With yarn

```
yarn add devcut/interactive-board
```

With CDN

```html
<script src="https://cdn.jsdelivr.net/npm/interactive-board/lib/interactive-board.min.js"></script>
```

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/interactive-board/lib/interactive-board.min.css">
```

or manual [download](https://github.com/devcut/interactive-board/archive/master.zip).

### Installation

3 possibilities to install the plugin :
* import
* require
* or by file include

#### Import

```javascript
import InteractiveBoard from 'interactive-board';
```

#### Require

```javascript
const InteractiveBoard = require('interactive-board');
```

#### File include

Link `interactive-board.min.js` in your HTML :

```html
<script src="interactive-board.min.js"></script>
```

#### Styles

Link `interactive-board.min.css` in your CSS :

```html
<link rel="stylesheet" href="interactive-board.min.css">
```

## Documentation :page_with_curl:

### Basic usage

Add this `div` in your html template

```html
<div class="interactive-board"></div>
```

Call `init` function to start the process 

```javascript
let ib = new InteractiveBoard({});

ib.init();
```

### Configuration

You can change the default configuration :

```js
let ib = new InteractiveBoard({
    board: {
        element: '.interactive-board', // Selector of board
        width: '100%', // Default width
        height: '100vh', // Default height
        background: '#000000' // Default background
    },

    // Change color of random shape
    activateRandomShape: {
        enabled: true,
        time: 200, // Interval before change color of another shape
        duration: 3000 // Duration of color 
    },

    colors: [], // Set here (in hex) different colors of boards. If array is empty, random color is choiced
    
    shape: {
        width: 18, // Default width of each shape
        height: 18, // Default height of each shape
        margin: 2, // Default margin
        background: '#1d1d1d' // Default color of shapes
    },

    // When user click on any shape, make a little pulse
    pulse: {
        enabled: true
    }
});

ib.init();
```

## Demos :grimacing:

- [basic]()
- [activateRandomShape]()
- [colors]()
- [shape]()
- [pulse]()