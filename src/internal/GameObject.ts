import Behavior from "./Behavior";

export default class GameObject {
    private static objects: Array<GameObject> = new Array<GameObject>();

    id: string;
    name: string;
    tag: string;
    enabled: boolean = true;
    behaviors: Map<String, Behavior> = new Map();

    static Find(name: string) {
        return GameObject.objects.find((obj) => {
            return obj.name === name;
        });
    }

    static FindByTag(tag: string) {
        return GameObject.objects.filter(obj => {
            return obj.tag === tag;
        });
    }

    static FindObjectsWithComponent(componentName): Array<GameObject> {
        return GameObject.objects.filter(obj => {
            return obj.behaviors.has(componentName);
        });
    }

    constructor(name: string, tag?: string) {
        this.name = name;
        this.tag = tag;
        this.id = Math.random().toString(36).substr(2, 9);

        GameObject.objects.push(this);
    }

    start() {
        this.behaviors.forEach(behavior => {
            behavior.start();
        });
    }

    update() {
        if(this.enabled) {
            this.behaviors.forEach(behavior => {
                if (behavior.enabled) {
                    behavior.update();
                }
            });
        }
    }

    static getObjects() {
        return this.objects;
    }

    sendMessage(method, params?) {
        this.behaviors.forEach(behavior => {
            if (behavior[method]) {
                behavior[method](params);
            }
        });
    }

    getComponent<T extends Behavior>(name: string): T {
        return this.behaviors.get(name) as T;
    }

    addComponent<T extends Behavior>(type: (new (obj: GameObject) => T), values) {
        const behavior = new type(this);

        if (values) {
            values.forEach(value => {
                behavior[value.name] = value.value;
            });
        }

        this.behaviors.set(type.name, behavior);
    }

    destroy() {
        this.sendMessage("onDestroy");
        GameObject.objects = GameObject.objects.filter(a => a.id !== this.id);
    }
}