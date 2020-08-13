import Behavior from "../internal/Behavior";
import Transform from "./Transform";
import Canvas from "../system/Canvas";

export default class OvalRenderer extends Behavior {
    private transform;
    private graphics;

    public color: string;
    public radius: number;

    public displayOrder = 0;

    start() {
        this.transform = this.getComponent<Transform>("Transform");
        this.graphics = Canvas.getInstance();
    }

    update() {
        this.graphics.addToQueue({
            type: 'circle',
            displayOrder: this.displayOrder,
            values: {
                x: this.transform.position.x + 12,
                y: this.transform.position.y + 12,
                radius: this.radius,
                color: this.color
            }
        });
    }
}