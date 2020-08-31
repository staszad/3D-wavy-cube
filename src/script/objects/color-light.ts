import * as THREE from "three";

export default class ColorLight extends THREE.DirectionalLight {
    constructor(
        color: THREE.Color,
        intensity: number,
        position: THREE.Vector3
    ) {
        super(color, intensity);
        this.position.set(position.x, position.y, position.z);
    }

    changeColor(color: THREE.Color) {
        this.color = color;
    }
}
