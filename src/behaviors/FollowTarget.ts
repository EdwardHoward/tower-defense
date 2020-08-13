import Behavior from "../internal/Behavior";
import MoveTowards from "./MoveTowards";
import GameObject from "../internal/GameObject";
import Victor from "victor";
import Transform from "./Transform";

export default class FollowTarget extends Behavior {
    private moveTowards: MoveTowards;
    private targetTransform: Transform;

    public target: GameObject;

    start() {
        this.moveTowards = this.getComponent<MoveTowards>("MoveTowards");
        this.targetTransform = this.target.getComponent<Transform>("Transform");
    }

    update() {
        this.moveTowards.endPosition = new Victor(this.targetTransform.position.x, this.targetTransform.position.y);
    }

    onAtPoint() {
        this.gameObject.sendMessage("onAtTarget", this.target);
    }
}