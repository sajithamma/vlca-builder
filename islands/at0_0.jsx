import { useGLTF, useAnimations, Html, positionalAudio } from '@react-three/drei'
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { Loading } from '@/primitives/loading';
import React, { useEffect, useState, useRef, Suspense } from 'react'
import * as THREE from "three";
import { TextureFilter } from "three";




export function At0_0() {

    const gltf = useGLTF('/assets/gltf/boat/scene.gltf');
    const boatRef = useRef();

    useFrame(() => {

        boatRef.current.position.x += 0.15;

    })

    return (<>

        {/** Remove the default mesh node below and write your code here  */}

        <mesh >
            <boxBufferGeometry attach="geometry" args={[10, 10, 10]} />
            <meshStandardMaterial attach="material" color="blue" />
        </mesh>


        <group ref={boatRef} scale={4} position={[-100, 19, -50]}>

            <Suspense fallback={<Loading />}>
                <primitive object={gltf.scene} dispose={null} />
            </Suspense>

        </group>

    </>)
}