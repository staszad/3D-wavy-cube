import * as THREE from "three";

export default class Cube extends THREE.Mesh {
    constructor(cubeIndex: number, rowDensity: number) {
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshStandardMaterial({ color: 0xababab });

        super(geometry, material);

        this.position.x = (cubeIndex % rowDensity) - rowDensity / 2 + 0.5;
        this.position.z =
            Math.floor(cubeIndex / rowDensity) - rowDensity / 2 + 0.5;
        this.name = `${cubeIndex}`;
    }
}
