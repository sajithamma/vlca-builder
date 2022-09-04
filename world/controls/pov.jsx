import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber'
import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

const TWEEN = require('three-tween')



export function CrossHireBoat(props) {

    const torusref = useRef();
    const state = useThree();

    useFrame(() => {

        //TWEEN.update();
    })

    useEffect(() => {


    }, [torusref.current]);



    return (
        <group {...props} dispose={null}>

            <mesh ref={torusref} scale={0.4} position={[0, -3, 0]} rotation={[Math.PI / 2.4, 0, 0]} castShadow>
                <torusBufferGeometry attach="geometry" args={[4, 2, 64, 64]} />
                <meshStandardMaterial attach="material" color="black" metalness={0.7} roughness={0.1} envMapIntensity={1} />
            </mesh>

        </group>
    )
}



export const Pov = () => {


    const mesh = new THREE.Mesh(new THREE.BoxGeometry(4, 4, 4), new THREE.MeshStandardMaterial({ color: "black", side: THREE.DoubleSide }));
    mesh.position.set(-50, 0, -30);
    const state = useThree();
    state.scene.add(mesh);
    state.gl.render(state.scene, state.camera);



    const ref = useRef();

    useFrame(({ camera }) => {
        // Move mesh to be flush with camera
        ref.current.position.copy(camera.position);
        ref.current.quaternion.copy(camera.quaternion);

        // Apply offset
        ref.current.translateZ(-4);


    });

    return (<>

        <mesh ref={ref} >

            <CrossHireBoat />

        </mesh>

    </>)
}