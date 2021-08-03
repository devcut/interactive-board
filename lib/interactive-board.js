(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.InteractiveBoard = factory());
}(this, (function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var InteractiveBoard = /*#__PURE__*/function () {
    function InteractiveBoard(config) {
      _classCallCheck(this, InteractiveBoard);

      var board = {
        element: '.interactive-board',
        width: '100%',
        height: '100vh',
        background: '#000000'
      };
      var activateRandomShape = {
        enabled: true,
        time: 200,
        duration: 3000
      };
      var colors = [];
      var shape = {
        width: 18,
        height: 18,
        margin: 2,
        background: '#1d1d1d'
      };
      var pulse = {
        enabled: true
      };
      this.config = _objectSpread2(_objectSpread2({}, config), {}, {
        board: _objectSpread2(_objectSpread2({}, board), config.board),
        colors: _objectSpread2(_objectSpread2({}, colors), config.colors),
        shape: _objectSpread2(_objectSpread2({}, shape), config.shape),
        activateRandomShape: _objectSpread2(_objectSpread2({}, activateRandomShape), config.activateRandomShape),
        pulse: _objectSpread2(_objectSpread2({}, pulse), config.pulse)
      });
      this.boardElement = document.querySelector(this.config.board.element);
      this.boardElement.style.width = this.config.board.width;
      this.boardElement.style.height = this.config.board.height;
      this.boardElement.style.background = this.config.board.background;
      this.maxShapeCapacityX = 0;
      this.maxShapeCapacityY = 0;
    }

    _createClass(InteractiveBoard, [{
      key: "init",
      value: function init() {
        var _this2 = this;

        this.boardElement.classList.add('interactive-board-style');
        document.addEventListener('DOMContentLoaded', function () {
          _this2.createShape(_this2.boardElement.offsetWidth, _this2.boardElement.offsetHeight);

          _this2.activateRandomShape();
        });
        window.addEventListener('resize', function () {
          _this2.createShape(_this2.boardElement.offsetWidth, _this2.boardElement.offsetHeight);
        });
      }
      /**
       * Create shape inside interactive board
       * @param boardWidth
       * @param boardHeight
       */

    }, {
      key: "createShape",
      value: function createShape(boardWidth, boardHeight) {
        var _this3 = this;

        this.boardElement.innerHTML = ''; // Set maximum X and Y capacity of shape

        this.maxShapeCapacityX = Math.floor(this.boardElement.offsetWidth / (this.config.shape.width + this.config.shape.margin * 2));
        this.maxShapeCapacityY = Math.floor(this.boardElement.offsetHeight / (this.config.shape.height + this.config.shape.margin * 2));

        var _loop = function _loop(i) {
          var shape = document.createElement("div");
          shape.setAttribute("data-position", i + 1);
          shape.setAttribute("data-enabled", true); // Set style of shape with config

          shape.style.width = _this3.config.shape.width;
          shape.style.height = _this3.config.shape.height;
          shape.style.margin = _this3.config.shape.margin;
          shape.style.background = _this3.config.shape.background; // Append each element on interactive board

          _this3.boardElement.appendChild(shape);

          shape.addEventListener('mouseover', function () {
            _this3.setColor(shape);
          });
          shape.addEventListener('mouseout', function () {
            _this3.removeColor(shape);
          });

          if (_this3.config.pulse.enabled) {
            shape.addEventListener('click', function () {
              _this3.pulseShapeAnimation(shape);
            });
          }
        };

        for (var i = 0; i < this.maxShapeCapacityX * this.maxShapeCapacityY; i++) {
          _loop(i);
        }
      }
      /**
       * Get color from the configuration or generate color randomly
       * @returns {string}
       */

    }, {
      key: "getShapeColor",
      value: function getShapeColor() {
        if (Object.keys(this.config.colors).length === 0) {
          // Random color
          return "#".concat(Math.floor(Math.random() * 16777215).toString(16));
        } else {
          // Random color from config array
          return this.config.colors[Math.floor(Math.random() * Object.keys(this.config.colors).length)];
        }
      }
      /**
       * Set color of the shape
       * @param element
       * @param color
       */

    }, {
      key: "setColor",
      value: function setColor(element, color) {
        if (element.getAttribute('data-enabled') === 'true') {
          if (!color) {
            color = this.getShapeColor();
          }

          element.style.background = color;
          element.style.boxShadow = "0 0 2px ".concat(color, ", 0 0 10px ").concat(color);
        }
      }
      /**
       * Remove color of the shape and set initial color
       * @param element
       */

    }, {
      key: "removeColor",
      value: function removeColor(element) {
        if (element.getAttribute('data-enabled') === 'true') {
          element.style.background = this.config.shape.background;
          element.style.boxShadow = "0 0 2px ".concat(this.config.shape.background);
        }
      }
      /**
       * Change color of random shape in the interactive board
       */

    }, {
      key: "activateRandomShape",
      value: function activateRandomShape() {
        // Check if config is enabled
        if (this.config.activateRandomShape.enabled) {
          var _this = this; // Take random shape of interactive board and set random color for some time w/ interval


          setInterval(function () {
            var randomShapeNumber = Math.floor(1 + Math.random() * _this.boardElement.childElementCount);
            var randomShape = document.querySelector("".concat(_this.config.board.element, " > div:nth-child(").concat(randomShapeNumber, ")"));

            if (randomShape.getAttribute('data-enabled') === 'true') {
              _this.setColor(randomShape);

              setTimeout(function () {
                _this.removeColor(randomShape);
              }, _this.config.activateRandomShape.duration);
            }
          }, this.config.activateRandomShape.time);
        }
      }
    }, {
      key: "pulseShapeAnimation",
      value: function pulseShapeAnimation(element) {
        var _this4 = this;

        var elementInformation = this.getShapeInformation(element);

        var _loop2 = function _loop2(i) {
          var _this = _this4;

          if (elementInformation.shapePulsePosition[i]) {
            var pulseElement = document.querySelector("".concat(_this.config.board.element, " > div:nth-child(").concat(elementInformation.shapePulsePosition[i], ")"));

            _this.setColor(pulseElement, elementInformation.shape.color);

            pulseElement.setAttribute('data-enabled', false);
            setTimeout(function () {
              pulseElement.setAttribute('data-enabled', true);

              _this.removeColor(pulseElement);
            }, 1000);
          }
        };

        for (var i = 0; i < Object.keys(elementInformation.shapePulsePosition).length; i++) {
          _loop2(i);
        }
      }
    }, {
      key: "getShapeInformation",
      value: function getShapeInformation(element) {
        var shapePosition = parseInt(element.getAttribute('data-position'));
        return {
          shape: {
            color: this.rgb2hex(element.style.background),
            position: shapePosition
          },
          shapePulsePosition: {
            0: shapePosition - this.maxShapeCapacityX + 1 >= 0 ? shapePosition - this.maxShapeCapacityX + 1 : null,
            1: shapePosition - this.maxShapeCapacityX >= 0 ? shapePosition - this.maxShapeCapacityX : null,
            2: shapePosition - this.maxShapeCapacityX - 1 >= 0 ? shapePosition - this.maxShapeCapacityX - 1 : null,
            3: shapePosition >= 0 ? shapePosition : null,
            4: shapePosition + 1 >= 0 ? shapePosition + 1 : null,
            5: shapePosition - 1 >= 0 ? shapePosition - 1 : null,
            6: shapePosition + this.maxShapeCapacityX + 1 >= 0 ? shapePosition + this.maxShapeCapacityX + 1 : null,
            7: shapePosition + this.maxShapeCapacityX >= 0 ? shapePosition + this.maxShapeCapacityX : null,
            8: shapePosition + this.maxShapeCapacityX - 1 >= 0 ? shapePosition + this.maxShapeCapacityX - 1 : null
          }
        };
      }
      /**
       * @param rgb
       * @returns {string}
       */

    }, {
      key: "rgb2hex",
      value: function rgb2hex(rgb) {
        return "#".concat(rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(function (n) {
          return parseInt(n, 10).toString(16).padStart(2, '0');
        }).join(''));
      }
    }]);

    return InteractiveBoard;
  }();

  return InteractiveBoard;

})));
