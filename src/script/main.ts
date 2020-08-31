import * as THREE from "three";

import ColorLight from "~/script/objects/color-light";
import Cube from "~/script/objects/cube";
import OrthCamera from "~/script/objects/orth-camera";

const fructumSize = 50;
const rowDensity = 15;
const lightIntensity = 1.5;
const angleVelocity = 0.06;

let angle = 0.01;

const lights = [
    new ColorLight(
        new THREE.Color(0x2a9d8f),
        lightIntensity,
        new THREE.Vector3(0, 5, 0)
    ),
    new ColorLight(
        new THREE.Color(0x264653),
        lightIntensity,
        new THREE.Vector3(5, 0, 0)
    ),
    new ColorLight(
        new THREE.Color(0xe9c46a),
        lightIntensity,
        new THREE.Vector3(0, 0, 5)
    ),
];

const loadLights = (scene: THREE.Scene) =>
    lights.forEach((light) => scene.add(light));

const loadCubes = (scene: THREE.Scene) => {
    for (let i = 0; i < Math.pow(rowDensity, 2); i++) {
        scene.add(new Cube(i, rowDensity));
    }
};

const distanceFromCenter = (cubeCoords: THREE.Vector3) => {
    const dx = 0 - cubeCoords.x;
    const dy = 0 - cubeCoords.y;
    const dz = 0 - cubeCoords.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

const animate = function (
    renderer: THREE.Renderer,
    scene: THREE.Scene,
    camera: THREE.OrthographicCamera
) {
    requestAnimationFrame(() => animate(renderer, scene, camera));

    for (let i = 0; i < Math.pow(rowDensity, 2); i++) {
        const cube = scene.getObjectByName(`${i}`);
        const distance = distanceFromCenter(
            new THREE.Vector3(cube.position.x, cube.position.y, cube.position.z)
        );

        const offset = distance / 2;
        const cos = Math.cos(angle - offset) * 2 + 3;
        cube.scale.y = cos * 2;
    }

    angle += angleVelocity;
    renderer.render(scene, camera);
};

const init = () => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(innerWidth, innerHeight);
    document.body.appendChild(renderer.domElement);

    const camera = new OrthCamera(fructumSize);

    loadCubes(scene);
    loadLights(scene);
    animate(renderer, scene, camera);

    window.addEventListener("resize", () => camera.resize(renderer));
};

init();
