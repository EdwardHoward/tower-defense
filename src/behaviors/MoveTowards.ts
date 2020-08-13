import Behavior from "../internal/Behavior";
import Transform from "./Transform";
import Victor from "victor";

export default class MoveTowards extends Behavior {
    private transform: Transform;

    public startPosition;
    public endPosition;
    public speed;

    start() {
        this.transform = this.getComponent<Transform>("Transform");
    }

    moveTowards(current, target, maxDistanceDelta) {
        const toVector_x = target.x - current.x;
        const toVector_y = target.y - current.y;

        const sqDist = toVector_x * toVector_x + toVector_y * toVector_y;

        if (sqDist == 0 || maxDistanceDelta >= 0 && sqDist <= maxDistanceDelta * maxDistanceDelta) {
            this.gameObject.sendMessage("onAtPoint");
            return target;
        }

        const dist = Math.sqrt(sqDist);

        return new Victor(
            current.x + toVector_x / dist * maxDistanceDelta,
            current.y + toVector_y / dist * maxDistanceDelta
        )
    }

    update() {
        const position = new Victor.fromObject(this.transform.position);
        const target = this.endPosition;

        this.transform.position = this.moveTowards(position, target, this.speed);
    }
}