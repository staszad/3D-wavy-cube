import * as THREE from "three";

export default class OrthCamera extends THREE.OrthographicCamera {
    fructumSize: number;

    constructor(fructumSize: number) {
        super(
            -innerWidth / fructumSize,
            innerWidth / fructumSize,
            innerHeight / fructumSize,
            -innerHeight / fructumSize,
            -1000,
            1000
        );

        this.fructumSize = fructumSize;

        this.position.z = 5;
        this.position.x = 5;
        this.position.y = 4;
        this.lookAt(new THREE.Vector3(0, 0, 0));
    }

    public resize(renderer: THREE.Renderer) {
        renderer.setSize(innerWidth, innerHeight);
        this.left = -innerWidth / this.fructumSize;
        this.right = innerWidth / this.fructumSize;
        this.top = innerHeight / this.fructumSize;
        this.bottom = -innerHeight / this.fructumSize;

        this.updateProjectionMatrix();
    }
}
