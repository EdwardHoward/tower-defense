import Behavior from "../internal/Behavior";

export default class Transform extends Behavior {
    public position: { x: number, y: number };
    rotation;
    scale;
}