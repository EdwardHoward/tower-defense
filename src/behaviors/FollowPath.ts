import Behavior from "../internal/Behavior";
import Transform from "./Transform";
import RectRenderer from "./RectRenderer";
import Victor from "victor";
import Time from "../system/Time";

function lerp(a, b, t) {
    return a + t * (b - a);
}

export default class FollowPath extends Behavior {
    private transform;
    private rectangle;

    private time = 0;
    private currentWaypoint = 0;
    private path = [
        Victor(25 - 12, 50 + 25 - 12),
        Victor(150 + 25 - 12, 50 + 25 - 12),
        Victor(150 + 25 - 12, 400 + 25 - 12),
        Victor(350 + 25 - 12, 400 + 25 - 12),
        Victor(350 + 25 - 12, 200 + 25 - 12),
        Victor(800 + 25 - 12, 200 + 25 - 12)
    ];

    public speed: number;

    start() {
        this.transform = this.getComponentWithType<Transform>(Transform);
        this.rectangle = this.getComponentWithType<RectRenderer>(RectRenderer);

        this.rectangle.color = '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);

        this.transform.position.x = this.path[this.currentWaypoint].x;
        this.transform.position.y = this.path[this.currentWaypoint].y;

        this.time = Time.time;
    }

    update() {
        const startPosition = this.path[this.currentWaypoint];
        const endPosition = this.path[this.currentWaypoint + 1];

        const distance = startPosition.distance(endPosition);
        const totalTime = distance / this.speed;
        const currentTime = Time.time - this.time;

        this.transform.position.x = lerp(startPosition.x, endPosition.x, currentTime / totalTime);
        this.transform.position.y = lerp(startPosition.y, endPosition.y, currentTime / totalTime);

        if (this.transform.position.x === endPosition.x && this.transform.position.y === endPosition.y) {
            if (this.currentWaypoint < this.path.length - 2) {
                this.currentWaypoint++;
                this.time = Time.time;
            } else {
                this.gameObject.destroy();
            }
        }
    }
}