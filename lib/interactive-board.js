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
    function InteractiveBoard() {
      _classCallCheck(this, InteractiveBoard);

      var board = {
        element: '.interactive-board'
      };
      var activateRandomShape = {
        enabled: true,
        time: 50,
        duration: 3000
      };
      var colors = ['#FFFFFF', '#873131'];
      var shape = {
        width: 15,
        height: 15,
        margin: 2,
        background: '#1d1d1d'
      };
      this.config = {
        board: _objectSpread2({}, board),
        activateRandomShape: _objectSpread2({}, activateRandomShape),
        colors: _objectSpread2({}, colors),
        shape: _objectSpread2({}, shape)
      };
      this.boardElement = document.querySelector(this.config.board.element);
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

          _this2.activateRandomShape();
        });
      }
    }, {
      key: "createShape",
      value: function createShape(boardWidth, boardHeight) {
        var _this3 = this;

        this.boardElement.innerHTML = '';
        var maxShapeCapacityX = Math.floor(boardWidth / (this.config.shape.width + this.config.shape.margin * 2));
        var maxShapeCapacityY = Math.floor(boardHeight / (this.config.shape.height + this.config.shape.margin * 2));

        var _loop = function _loop(i) {
          var shape = document.createElement("div");
          shape.style.width = _this3.config.shape.width;
          shape.style.height = _this3.config.shape.height;
          shape.style.margin = _this3.config.shape.margin;
          shape.style.background = _this3.config.shape.background;

          _this3.boardElement.appendChild(shape);

          shape.addEventListener('mouseover', function () {
            _this3.setColor(shape);
          });
          shape.addEventListener('mouseout', function () {
            _this3.removeColor(shape);
          });
        };

        for (var i = 0; i < maxShapeCapacityX * maxShapeCapacityY; i++) {
          _loop();
        }
      }
    }, {
      key: "getShapeColor",
      value: function getShapeColor() {
        if (Object.keys(this.config.colors).length === 0) {
          return "#".concat(Math.floor(Math.random() * 16777215).toString(16));
        } else {
          return this.config.colors[Math.floor(Math.random() * Object.keys(this.config.colors).length)];
        }
      }
    }, {
      key: "setColor",
      value: function setColor(element) {
        var color = this.getShapeColor();
        element.style.background = color;
        element.style.boxShadow = "0 0 2px ".concat(color, ", 0 0 10px ").concat(color);
      }
    }, {
      key: "removeColor",
      value: function removeColor(element) {
        element.style.background = this.config.shape.background;
        element.style.boxShadow = "0 0 2px ".concat(this.config.shape.background);
      }
    }, {
      key: "activateRandomShape",
      value: function activateRandomShape() {
        if (this.config.activateRandomShape.enabled) {
          var _this = this;

          setInterval(function () {
            var random = Math.floor(1 + Math.random() * _this.boardElement.childElementCount);
            var child = document.querySelector("".concat(_this.config.board.element, " > div:nth-child(").concat(random, ")"));

            _this.setColor(child);

            setTimeout(function () {
              _this.removeColor(child);
            }, _this.config.activateRandomShape.duration);
          }, this.config.activateRandomShape.time);
        }
      }
    }]);

    return InteractiveBoard;
  }();

  return InteractiveBoard;

})));
