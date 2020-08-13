import Behavior from "../internal/Behavior";
import Transform from "./Transform";
import Canvas from "../system/Canvas";

export default class RectRenderer extends Behavior {
    private transform;
    private graphics: Canvas;

    public color: string;
    public width: number;
    public height: number;
    public displayOrder: number = 0;

    start() {
        this.transform = this.getComponent<Transform>("Transform");
        this.graphics = Canvas.getInstance();
    }

    update() {
        this.graphics.addToQueue({
            type: 'rectangle',
            displayOrder: this.displayOrder,
            values: {
                x: this.transform.position.x,
                y: this.transform.position.y,
                width: this.width,
                height: this.height,
                color: this.color
            }
        });
    }
}