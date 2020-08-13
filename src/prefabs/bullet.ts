import Transform from "../behaviors/Transform"
import RectRenderer from "../behaviors/RectRenderer"
import RigidBody from "../behaviors/RigidBody"
import Victor from "victor";
import MoveTowards from "../behaviors/MoveTowards"

export const bulletPrefab = {
    name: "Bullet",
    components: [{
        type: Transform,
        values: [
            {
                name: 'position',
                value: { x: 0, y: 0, z: 0 }
            }
        ]
    },
    {
        type: RectRenderer,
        values: [
            {
                name: 'color',
                value: '#FFFF00'
            },
            {
                name: 'width',
                value: 5
            },
            {
                name: 'height',
                value: 5
            }
        ]
    },
    {
        type: MoveTowards,
        values: [
            {
                name: 'startPosition',
                value: new Victor(0, 0)
            },
            {
                name: 'endPosition',
                value: new Victor(400, 400)
            },
            {
                name: 'speed',
                value: 5
            }
        ]
    }]
}