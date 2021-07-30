import './index.scss';

export default class InteractiveBoard {

    constructor() {

        const board = {
            element: '.interactive-board',
        };

        const activateRandomShape = {
            enabled: true,
            time: 50,
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
            board: {
                ...board
            },
            activateRandomShape: {
                ...activateRandomShape
            },
            colors: {
                ...colors
            },
            shape: {
                ...shape
            }
        };

        this.boardElement = document.querySelector(this.config.board.element);
    }

    init() {

        this.boardElement.classList.add('interactive-board-style');

        document.addEventListener('DOMContentLoaded', () => {
            this.createShape(this.boardElement.offsetWidth, this.boardElement.offsetHeight);
            this.activateRandomShape();
        });

        window.addEventListener('resize', () => {
            this.createShape(this.boardElement.offsetWidth, this.boardElement.offsetHeight);
            this.activateRandomShape();
        });
    }

    createShape(boardWidth, boardHeight) {

        this.boardElement.innerHTML = '';

        let maxShapeCapacityX = Math.floor(boardWidth / (this.config.shape.width + this.config.shape.margin * 2));
        let maxShapeCapacityY = Math.floor(boardHeight / (this.config.shape.height + this.config.shape.margin * 2));

        for (let i = 0; i < maxShapeCapacityX * maxShapeCapacityY; i++) {
            let shape = document.createElement("div");
            shape.style.width = this.config.shape.width;
            shape.style.height = this.config.shape.height;
            shape.style.margin = this.config.shape.margin;
            shape.style.background = this.config.shape.background;
            this.boardElement.appendChild(shape);

            shape.addEventListener('mouseover', () => {
                this.setColor(shape);
            });

            shape.addEventListener('mouseout', () => {
                this.removeColor(shape);
            });
        }

    }

    getShapeColor() {

        if (Object.keys(this.config.colors).length === 0) {
            return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        } else {
            return this.config.colors[Math.floor(Math.random() * Object.keys(this.config.colors).length)];
        }

    }

    setColor(element) {
        const color = this.getShapeColor();
        element.style.background = color;
        element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
    }

    removeColor(element) {
        element.style.background = this.config.shape.background;
        element.style.boxShadow = `0 0 2px ${this.config.shape.background}`;
    }

    activateRandomShape() {

        if (this.config.activateRandomShape.enabled) {

            let _this = this;

            setInterval(function () {

                let random = Math.floor(1 + Math.random() * _this.boardElement.childElementCount);
                let child = document.querySelector(`${_this.config.board.element} > div:nth-child(${random})`);
                _this.setColor(child);

                setTimeout(function () {
                    _this.removeColor(child);
                }, _this.config.activateRandomShape.duration);

            }, this.config.activateRandomShape.time);

        }
    }
}