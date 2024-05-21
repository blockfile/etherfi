import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap, Power4, Power2 } from "gsap";

const SceneComponent = () => {
    const sceneRef = useRef();

    useEffect(() => {
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(500, 500); // Fixed size
        renderer.shadowMap.enabled = false;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.shadowMap.needsUpdate = true;

        sceneRef.current.appendChild(renderer.domElement);

        const camera = new THREE.PerspectiveCamera(
            35,
            1, // Aspect ratio (500/500)
            1,
            500
        );
        const scene = new THREE.Scene();
        const cameraRange = 3;

        const setcolor = 0x000000;
        scene.background = new THREE.Color(setcolor);
        scene.fog = new THREE.Fog(setcolor, 2.5, 3.5);

        const sceneGruop = new THREE.Object3D();
        const particularGruop = new THREE.Object3D();
        const modularGruop = new THREE.Object3D();

        function generateParticle(num, amp = 2) {
            const gmaterial = new THREE.MeshPhysicalMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
            });

            const gparticular = new THREE.CircleGeometry(0.2, 5);

            for (let i = 1; i < num; i++) {
                const pscale = 0.001 + Math.abs(mathRandom(0.03));
                const particular = new THREE.Mesh(gparticular, gmaterial);
                particular.position.set(
                    mathRandom(amp),
                    mathRandom(amp),
                    mathRandom(amp)
                );
                particular.rotation.set(
                    mathRandom(),
                    mathRandom(),
                    mathRandom()
                );
                particular.scale.set(pscale, pscale, pscale);
                particular.speedValue = mathRandom(1);

                particularGruop.add(particular);
            }
        }
        generateParticle(200, 2);

        sceneGruop.add(particularGruop);
        scene.add(modularGruop);
        scene.add(sceneGruop);

        function mathRandom(num = 1) {
            const setNumber = -Math.random() * num + Math.random() * num;
            return setNumber;
        }

        function init() {
            for (let i = 0; i < 30; i++) {
                const geometry = new THREE.IcosahedronGeometry(1);
                const material = new THREE.MeshStandardMaterial({
                    flatShading: true,
                    color: 0x111111,
                    transparent: false,
                    opacity: 1,
                    wireframe: false,
                });
                const cube = new THREE.Mesh(geometry, material);
                cube.speedRotation = Math.random() * 0.1;
                cube.positionX = mathRandom();
                cube.positionY = mathRandom();
                cube.positionZ = mathRandom();
                cube.castShadow = true;
                cube.receiveShadow = true;

                const newScaleValue = mathRandom(0.3);

                cube.scale.set(newScaleValue, newScaleValue, newScaleValue);
                cube.rotation.x = mathRandom((180 * Math.PI) / 180);
                cube.rotation.y = mathRandom((180 * Math.PI) / 180);
                cube.rotation.z = mathRandom((180 * Math.PI) / 180);
                cube.position.set(
                    cube.positionX,
                    cube.positionY,
                    cube.positionZ
                );
                modularGruop.add(cube);
            }
        }

        camera.position.set(0, 0, cameraRange);
        let cameraValue = false;

        function cameraSet() {
            if (!cameraValue) {
                gsap.to(camera.position, {
                    duration: 1,
                    z: cameraRange,
                    ease: Power4.easeInOut,
                });
                cameraValue = true;
            } else {
                gsap.to(camera.position, {
                    duration: 1,
                    z: cameraRange,
                    x: 0,
                    y: 0,
                    ease: Power4.easeInOut,
                });
                INTERSECTED = null;
                cameraValue = false;
            }
        }

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
        const light = new THREE.SpotLight(0xffffff, 3);
        light.position.set(5, 5, 2);
        light.castShadow = true;
        light.shadow.mapSize.width = 10000;
        light.shadow.mapSize.height = light.shadow.mapSize.width;
        light.penumbra = 0.5;

        const lightBack = new THREE.PointLight(0x0fffff, 1);
        lightBack.position.set(0, -3, -1);

        scene.add(sceneGruop);
        scene.add(light);
        scene.add(lightBack);

        const rectSize = 2;
        const intensity = 100;
        const rectLight = new THREE.RectAreaLight(
            0xffffff,
            intensity,
            rectSize,
            rectSize
        );
        rectLight.position.set(0, 0, 1);
        rectLight.lookAt(0, 0, 0);
        scene.add(rectLight);

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        let INTERSECTED;

        function onMouseMove(event) {
            event.preventDefault();
            mouse.x = (event.clientX / 500) * 2 - 1; // Adjusted for fixed size
            mouse.y = -(event.clientY / 500) * 2 + 1; // Adjusted for fixed size
        }

        function onMouseDown(event) {
            event.preventDefault();
            onMouseMove(event);
            raycaster.setFromCamera(mouse, camera);
            const intersected = raycaster.intersectObjects(
                modularGruop.children
            );
            if (intersected.length > 0) {
                cameraValue = false;
                if (INTERSECTED != intersected[0].object) {
                    if (INTERSECTED)
                        INTERSECTED.material.emissive.setHex(
                            INTERSECTED.currentHex
                        );
                    INTERSECTED = intersected[0].object;
                    INTERSECTED.currentHex =
                        INTERSECTED.material.emissive.getHex();
                    INTERSECTED.material.emissive.setHex(0xffff00);
                    gsap.to(camera.position, {
                        duration: 1,
                        x: INTERSECTED.position.x + 0.5,
                        y: INTERSECTED.position.y + 0.5,
                        z: INTERSECTED.position.z + 0.5,
                        ease: Power2.easeInOut,
                    });
                } else {
                    gsap.to(camera.position, {
                        duration: 1,
                        x: 0,
                        y: 0,
                        z: cameraRange,
                        ease: Power2.easeInOut,
                    });
                    INTERSECTED = null;
                }
            }
        }

        window.addEventListener("mousemove", onMouseMove, false);
        window.addEventListener("mousedown", onMouseDown, false);

        function onWindowResize() {
            camera.aspect = 1; // Aspect ratio (500/500)
            camera.updateProjectionMatrix();
            renderer.setSize(500, 500); // Fixed size
        }

        window.addEventListener("resize", onWindowResize, false);

        function animate() {
            const time = 0.001 * Date.now();
            sceneGruop.rotation.y += 0.002;
            particularGruop.rotation.x += 0.002;
            particularGruop.rotation.y += 0.002;
            particularGruop.rotation.z += 0.002;

            modularGruop.children.forEach(function (mesh) {
                mesh.rotation.x += 10 * mesh.speedRotation;
                mesh.rotation.y += 10 * mesh.speedRotation;
                mesh.rotation.z += 10 * mesh.speedRotation;

                mesh.position.x =
                    mesh.positionX + 0.3 * Math.cos(time * mesh.speed);
                mesh.position.y =
                    mesh.positionY + 0.3 * Math.sin(time * mesh.speed);
                mesh.position.z =
                    mesh.positionZ + 0.3 * Math.sin(time * mesh.speed);
            });

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(
                modularGruop.children
            );

            if (intersects.length > 0) {
                if (INTERSECTED != intersects[0].object) {
                    if (INTERSECTED)
                        INTERSECTED.material.emissive.setHex(
                            INTERSECTED.currentHex
                        );
                    INTERSECTED = intersects[0].object;
                    INTERSECTED.currentHex =
                        INTERSECTED.material.emissive.getHex();
                    INTERSECTED.material.emissive.setHex(0xffff00);
                }
            } else {
                if (INTERSECTED)
                    INTERSECTED.material.emissive.setHex(
                        INTERSECTED.currentHex
                    );
                INTERSECTED = null;
            }

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        init();
        animate();

        return () => {
            window.removeEventListener("mousemove", onMouseMove, false);
            window.removeEventListener("mousedown", onMouseDown, false);
            window.removeEventListener("resize", onWindowResize, false);
            sceneRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={sceneRef}></div>;
};

export default SceneComponent;
