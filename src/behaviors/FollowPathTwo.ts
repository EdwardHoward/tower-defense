import Behavior from "../internal/Behavior";
import Transform from "./Transform";
import Victor from "victor";

export default class FollowPath extends Behavior {
    private transform;
    public speed: number;

    public currentWaypoint = 0;

    private path = [Victor(25 - 12, 50 + 25 - 12), Victor(150 + 25 - 12, 50 + 25 - 12), Victor(150 + 25 - 12, 400 + 25 - 12), Victor(350 + 25 - 12, 400 + 25 - 12), Victor(350 + 25 - 12, 200 + 25 - 12), Victor(800 + 25 - 12, 200 + 25 - 12)];

    start() {
        this.transform = this.getComponentWithType<Transform>(Transform);
    }

    moveTowards(current, target, maxDistanceDelta) {
        const toVector_x = target.x - current.x;
        const toVector_y = target.y - current.y;

        const sqDist = toVector_x * toVector_x + toVector_y * toVector_y;

        if (sqDist == 0 || maxDistanceDelta >= 0 && sqDist <= maxDistanceDelta * maxDistanceDelta) {
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
        const target = this.path[this.currentWaypoint];

        this.transform.position = this.moveTowards(position, target, this.speed);

        if (this.transform.position.x == target.x && this.transform.position.y === target.y) {
            if (this.currentWaypoint < this.path.length - 1) {
                this.currentWaypoint++;
            } else {
                this.gameObject.destroy();
            }
        }
    }
}