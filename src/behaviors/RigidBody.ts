import Behavior from "../internal/Behavior";
import Transform from "./Transform";
import Input from "../system/Input";
import RectRenderer from "./RectRenderer";
import Canvas from "../system/Canvas";

export default class RigidBody extends Behavior {
    transform;
    rectangle;
    graphics;

    start() {
        this.transform = this.getComponent<Transform>("Transform");
        this.rectangle = this.getComponent<RectRenderer>("RectRenderer");

        this.graphics = Canvas.getInstance().context;
    }

    update() {
        const mousePosition = Input.mousePosition;

        const left = this.transform.position.x;
        const right = this.transform.position.x + this.rectangle.width;
        const top = this.transform.position.y;
        const bottom = this.transform.position.y + this.rectangle.height;

        if (mousePosition.x >= left && mousePosition.x <= right && mousePosition.y >= top && mousePosition.y <= bottom) {
            if (Input.mouseDown && Input.mouseWasDown) {
                this.gameObject.sendMessage("onMouseDown");
            }
        }

        // Check for collisions with other objects
    }
}