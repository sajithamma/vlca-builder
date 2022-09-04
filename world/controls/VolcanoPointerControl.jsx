import React, { useRef, useEffect, Suspense, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";

import { PointerLockControls } from '@react-three/drei'
import * as THREE from 'three';

const TWEEN = require('three-tween')

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();

let raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 10);


export const VolcanoPointerControl = (props) => {

    const cords = props.cords;
    const angles = props.angles;

    const state = useThree();


    const pointercontrols = useRef();

    const onLock = () => {

        //console.log('pointer control is on');
    }

    const onUnLock = () => {

        //console.log('pointer control is off');
    }


    const moveCamera = (x, y, z, timeout = 2000, easing = true) => {


        const TweenControl = new TWEEN.Tween(state.camera.position).to({
            x: x,
            y: y,
            z: z
        }, timeout);

        if (easing) {

            TweenControl.easing(TWEEN.Easing.Quartic.InOut);
        }

        TweenControl.start();


    }

    const rotateCamera = (x, y, z, timeout = 2000, easing = true) => {


        const TweenControl = new TWEEN.Tween(state.camera.rotation).to({
            x: x,
            y: y,
            z: z
        }, timeout);

        if (easing) {

            TweenControl.easing(TWEEN.Easing.Quartic.InOut);
        }

        TweenControl.start();


    }

    const snapShot = () => {

        return {

            position: state.camera.position.clone(),
            rotation: state.camera.rotation.clone()

        }
    }


    useEffect(() => {


        window.snapShot = snapShot;
        window.moveCamera = moveCamera;
        window.rotateCamera = rotateCamera;


        window.pointercontrols = pointercontrols.current;

        const onKeyDown = function (event) {


            switch (event.code) {

                case 'ArrowUp':
                case 'KeyW':
                    moveForward = true;
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    moveLeft = true;
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    moveBackward = true;
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    moveRight = true;
                    break;

                case 'Space':
                    if (canJump === true) velocity.y += 350;
                    canJump = false;
                    break;

            }

        };

        const onKeyUp = function (event) {

            switch (event.code) {

                case 'ArrowUp':
                case 'KeyW':
                    moveForward = false;
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    moveLeft = false;
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    moveBackward = false;
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    moveRight = false;
                    break;

            }

        };

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);

        window.pointercontrols = pointercontrols.current;


    }, [pointercontrols.current]);




    useFrame(() => {

        TWEEN.update();

        const time = performance.now();

        raycaster.ray.origin.copy(pointercontrols.current.getObject().position);
        raycaster.ray.origin.y -= 10;


        const intersections = raycaster.intersectObjects(state.scene.children, false);
        const onObject = intersections.length > 0;


        const delta = (time - prevTime) / 1000;


        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass


        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize(); // this ensures consistent movements in all directions


        if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

        if (onObject === true) {

            velocity.y = Math.max(0, velocity.y);
            canJump = true;

        }



        pointercontrols.current.moveRight(- velocity.x * delta);
        pointercontrols.current.moveForward(- velocity.z * delta);

        pointercontrols.current.getObject().position.y += (velocity.y * delta); // new behavior

        if (pointercontrols.current.getObject().position.y < 10) {

            velocity.y = 0;
            pointercontrols.current.getObject().position.y = 10;

            canJump = true;

        }

        prevTime = time;



    });


    return (<>


        <PointerLockControls ref={pointercontrols} onChange={null} onLock={onLock} onUnlock={onUnLock} />


    </>)



}