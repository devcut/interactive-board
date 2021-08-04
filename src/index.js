import './index.scss';

export default class InteractiveBoard {

    constructor(config) {

        const board = {
            element: '.interactive-board',
            width: '100%',
            height: '100vh',
            background: '#000000'
        };

        const activateRandomShape = {
            enabled: false,
            time: 500,
            duration: 3000
        }

        const colors = [];

        const shape = {
            width: 18,
            height: 18,
            margin: 2,
            background: '#1d1d1d'
        }

        const pulse = {
            enabled: true
        }

        this.config = {
            ...config,
            board: {
                ...board, ...config.board
            },
            colors: {
                ...colors, ...config.colors
            },
            shape: {
                ...shape, ...config.shape
            },
            activateRandomShape: {
                ...activateRandomShape, ...config.activateRandomShape
            },
            pulse: {
                ...pulse, ...config.pulse
            }
        };

        this.boardElement = document.querySelector(this.config.board.element);
        this.boardElement.style.width = this.config.board.width;
        this.boardElement.style.height = this.config.board.height;
        this.boardElement.style.background = this.config.board.background;
        this.maxShapeCapacityX = 0;
        this.maxShapeCapacityY = 0;
    }

    init() {

        this.boardElement.classList.add('interactive-board-style');

        document.addEventListener('DOMContentLoaded', () => {
            this.createShape(this.boardElement.offsetWidth, this.boardElement.offsetHeight);
            this.activateRandomShape();
        });

        window.addEventListener('resize', () => {
            this.createShape(this.boardElement.offsetWidth, this.boardElement.offsetHeight);
        });

    }

    /**
     * Create shape inside interactive board
     * @param boardWidth
     * @param boardHeight
     */
    createShape(boardWidth, boardHeight) {

        this.boardElement.innerHTML = '';

        // Set maximum X and Y capacity of shape
        this.maxShapeCapacityX = Math.floor(this.boardElement.offsetWidth / (this.config.shape.width + this.config.shape.margin * 2));
        this.maxShapeCapacityY = Math.floor(this.boardElement.offsetHeight / (this.config.shape.height + this.config.shape.margin * 2));

        for (let i = 0; i < this.maxShapeCapacityX * this.maxShapeCapacityY; i++) {
            let shape = document.createElement("div");
            shape.setAttribute("data-position", i + 1);
            shape.setAttribute("data-enabled", true);

            // Set style of shape with config
            shape.style.width = this.config.shape.width + 'px';
            shape.style.height = this.config.shape.height + 'px';
            shape.style.margin = this.config.shape.margin + 'px';
            shape.style.background = this.config.shape.background;

            // Append each element on interactive board
            this.boardElement.appendChild(shape);

            shape.addEventListener('mouseover', () => {
                this.setColor(shape);
            });

            shape.addEventListener('mouseout', () => {
                this.removeColor(shape);
            });

            if (this.config.pulse.enabled) {
                shape.addEventListener('click', () => {
                    this.pulseShapeAnimation(shape);
                });
            }
        }

    }

    /**
     * Get color from the configuration or generate color randomly
     * @returns {string}
     */
    getShapeColor() {
        if (Object.keys(this.config.colors).length === 0) {
            // Random color
            return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
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
    setColor(element, color) {
        if (element.getAttribute('data-enabled') === 'true') {
            if (!color) {
                color = this.getShapeColor();
            }
            element.style.background = color;
            element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
        }
    }

    /**
     * Remove color of the shape and set initial color
     * @param element
     */
    removeColor(element) {
        if (element.getAttribute('data-enabled') === 'true') {
            element.style.background = this.config.shape.background;
            element.style.boxShadow = `0 0 2px ${this.config.shape.background}`;
        }
    }

    /**
     * Change color of random shape in the interactive board
     */
    activateRandomShape() {
        // Check if config is enabled
        if (this.config.activateRandomShape.enabled) {

            let _this = this;

            // Take random shape of interactive board and set random color for some time w/ interval
            setInterval(function () {

                let randomShapeNumber = Math.floor(1 + Math.random() * _this.boardElement.childElementCount);
                let randomShape = document.querySelector(`${_this.config.board.element} > div:nth-child(${randomShapeNumber})`);

                if (randomShape.getAttribute('data-enabled') === 'true') {
                    _this.setColor(randomShape);

                    setTimeout(function () {
                        _this.removeColor(randomShape);
                    }, _this.config.activateRandomShape.duration);
                }

            }, this.config.activateRandomShape.time);

        }
    }

    pulseShapeAnimation(element) {
        let elementInformation = this.getShapeInformation(element);

        for (let i = 0; i < Object.keys(elementInformation.shapePulsePosition).length; i++) {

            let _this = this;

            if (elementInformation.shapePulsePosition[i]) {
                let pulseElement = document.querySelector(`${_this.config.board.element} > div:nth-child(${elementInformation.shapePulsePosition[i]})`);

                _this.setColor(pulseElement, elementInformation.shape.color);
                pulseElement.setAttribute('data-enabled', false);

                setTimeout(function () {
                    pulseElement.setAttribute('data-enabled', true);
                    _this.removeColor(pulseElement);
                }, 1000);
            }
        }
    }

    getShapeInformation(element) {

        const shapePosition = parseInt(element.getAttribute('data-position'));

        return {
            shape: {
                color: this.rgb2hex(element.style.background),
                position: shapePosition
            },
            shapePulsePosition: {
                0: (shapePosition - this.maxShapeCapacityX + 1 >= 0) ? shapePosition - this.maxShapeCapacityX + 1 : null,
                1: (shapePosition - this.maxShapeCapacityX >= 0) ? shapePosition - this.maxShapeCapacityX : null,
                2: (shapePosition - this.maxShapeCapacityX - 1 >= 0) ? shapePosition - this.maxShapeCapacityX - 1 : null,
                3: (shapePosition >= 0) ? shapePosition : null,
                4: (shapePosition + 1 >= 0) ? shapePosition + 1 : null,
                5: (shapePosition - 1 >= 0) ? shapePosition - 1 : null,
                6: (shapePosition + this.maxShapeCapacityX + 1 >= 0) ? shapePosition + this.maxShapeCapacityX + 1 : null,
                7: (shapePosition + this.maxShapeCapacityX >= 0) ? shapePosition + this.maxShapeCapacityX : null,
                8: (shapePosition + this.maxShapeCapacityX - 1 >= 0) ? shapePosition + this.maxShapeCapacityX - 1 : null,
            }
        };
    }

    /**
     * @param rgb
     * @returns {string}
     */
    rgb2hex(rgb) {
        return `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`;
    }
}