import Behavior from "../internal/Behavior";
import GameObject from "../internal/GameObject";

export default class BulletBehavior extends Behavior {
    public damage 

    start() {

    }

    update() {

    }

    onAtTarget(target: GameObject) {
        target.sendMessage("onHit", this.damage);
        this.gameObject.destroy();
    }
}