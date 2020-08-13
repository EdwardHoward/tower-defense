export default class Canvas {
    private static instance;

    private _canvas;
    private _context;

    private _renderQueue = [];

    private constructor() {
        const WIDTH = 1000;
        const HEIGHT = 600;

        this._canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this._canvas.width = WIDTH
        this._canvas.height = HEIGHT;

        this._context = this._canvas.getContext("2d");
    }

    get context() {
        return this._context;
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Canvas();
        }

        return this.instance;
    }

    addToQueue(command) {
        this._renderQueue.push(command);
    }

    render() {
        this._renderQueue.sort((a, b) => a.displayOrder - b.displayOrder);

        this._renderQueue.forEach(command => {
            switch (command.type) {
                case "rectangle":
                    this._context.fillStyle = command.values.color;
                    this._context.fillRect(Math.round(command.values.x), Math.round(command.values.y), command.values.width, command.values.height);
                    break;
                case "circle":
                    this._context.fillStyle = command.values.color;
                    this._context.beginPath();
                    this._context.arc(command.values.x, command.values.y, command.values.radius, 0, 2 * Math.PI, false);
                    this._context.fill();
                    break;
            }
        });

        this._renderQueue = [];
    }
}