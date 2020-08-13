import Behavior from "../internal/Behavior";

export default class Health extends Behavior {
    public health = 2;

    start() {

    }

    update() {
        if (this.health <= 0) {
            this.gameObject.sendMessage("onDie");
        }
    }

    // onHit() {
    //     this.health--;
    // }
}