import GameObject from "./GameObject";
import Transform from "../behaviors/Transform";

export default class Behavior {
    enabled: boolean = true;

    constructor(protected gameObject: GameObject) {
        this.start = this.start.bind(this);
        this.update = this.update.bind(this);
    }

    start() {

    }

    update() {

    }

    instantiate(obj, position?) {
        const object = new GameObject(obj.name, obj.tag);
        obj.components.forEach(component => {
            if (position && component.type.name === "Transform") {
                const behavior = new Transform(object);
                behavior.position = position;
                object.behaviors.set(component.type.name, behavior);
            } else {
                const behavior = new component.type(object);

                if (component.values) {
                    component.values.forEach(value => {
                        behavior[value.name] = value.value;
                    });
                }

                object.behaviors.set(component.type.name, behavior);
            }
        });

        object.start();

        return object;
    }

    destroy(obj: GameObject) {
        obj.destroy();
    }

    protected getComponent<T extends Behavior>(name: string): T {
        return this.gameObject.getComponent<T>(name);
    }

    getComponentWithType<T extends Behavior>(type: { new(gameObject: GameObject): T }): T {
        return this.gameObject.getComponent<T>(type.name) as T;
    }

    sendMessage(method, params?) {
        this.gameObject.sendMessage(method, params);
    }
}