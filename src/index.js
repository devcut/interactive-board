import './index.scss';

export default class InteractiveBoard {

    constructor(config) {

        const board = {
            element: '.interactive-board',
        };

        const activateRandomShape = {
            enabled: true,
            time: 1000,
            duration: 3000
        }

        const colors = ['#FFFFFF', '#873131'];

        const shape = {
            width: 15,
            height: 15,
            margin: 2,
            background: '#1d1d1d'
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
        };

        this.boardElement = document.querySelector(this.config.board.element);
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
            shape.setAttribute("data-position", i);

            // Set style of shape with config
            shape.style.width = this.config.shape.width;
            shape.style.height = this.config.shape.height;
            shape.style.margin = this.config.shape.margin;
            shape.style.background = this.config.shape.background;

            // Append each element on interactive board
            this.boardElement.appendChild(shape);

            shape.addEventListener('mouseover', () => {
                this.setColor(shape);
            });

            shape.addEventListener('mouseout', () => {
                this.removeColor(shape);
            });
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
     */
    setColor(element) {
        const color = this.getShapeColor();
        element.style.background = color;
        element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
    }

    /**
     * Remove color of the shape and set initial color
     * @param element
     */
    removeColor(element) {
        element.style.background = this.config.shape.background;
        element.style.boxShadow = `0 0 2px ${this.config.shape.background}`;
    }

    /**
     * Change color of random shape in the interactive board
     */
    activateRandomShape() {
        if (this.config.activateRandomShape.enabled) {

            let _this = this;

            setInterval(function () {

                let randomShape = Math.floor(1 + Math.random() * _this.boardElement.childElementCount);
                let child = document.querySelector(`${_this.config.board.element} > div:nth-child(${randomShape})`);
                _this.setColor(child);

                setTimeout(function () {
                    _this.removeColor(child);
                }, _this.config.activateRandomShape.duration);

            }, this.config.activateRandomShape.time);

        }
    }
}