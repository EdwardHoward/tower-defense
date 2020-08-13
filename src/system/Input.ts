export default class Input {
    static mousePosition = { x: 0, y: 0};
    static mouseDown = false;
    static mouseWasDown = false;

    static init() {
        document.addEventListener('mousemove', (e) => {
            this.mousePosition = { x: e.clientX, y: e.clientY };
        });

        document.addEventListener('mousedown', (e) => {
            this.mouseDown = true;
            this.mouseWasDown = true;
        });

        document.addEventListener('mouseup', (e) => {
            this.mouseDown = false;
            this.mouseWasDown = false;
        });
    }

    static update() {
        this.mouseWasDown = false;
    }
}