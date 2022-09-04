import React from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { Water } from 'three/examples/jsm/objects/Water';
import { Sky } from 'three/examples/jsm/objects/Sky';


export const World = (props) => {


    //Create Water
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

    const water = new Water(

        waterGeometry,
        {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load('/assets/3/texture/waternormals.jpg', function (texture) {

                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

            }),
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7

        }
    );

    //Create Sun
    const sun = new THREE.Vector3();

    //Create Sky
    const sky = new Sky();
    sky.scale.setScalar(10000);

    const skyUniforms = sky.material.uniforms;

    skyUniforms['turbidity'].value = 2;
    skyUniforms['rayleigh'].value = 7;
    skyUniforms['mieCoefficient'].value = 0.001;
    skyUniforms['mieDirectionalG'].value = 0.8;

    //Adjust Environemnet and sky/water/sun
    const state = useThree();
    window.camera = state.camera;

    const pmremGenerator = new THREE.PMREMGenerator(state.gl);
    let renderTarget;
    const parameters = {
        elevation: 2, //to adjust day/evening/sunset
        azimuth: 180
    };

    const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
    const theta = THREE.MathUtils.degToRad(parameters.azimuth);

    sun.setFromSphericalCoords(1, phi, theta);
    sky.material.uniforms['sunPosition'].value.copy(sun);
    water.material.uniforms['sunDirection'].value.copy(sun).normalize();

    if (renderTarget !== undefined) renderTarget.dispose();

    renderTarget = pmremGenerator.fromScene(sky);

    state.scene.environment = renderTarget.texture;


    useFrame((state) => {


        water.material.uniforms['time'].value += 1.0 / 60.0;

        //const delta = state.clock.getDelta();

    });





    return (<>

        <ambientLight intensity={1} />
        <directionalLight intensity={0.01} />

        <mesh>
            <primitive key={"mysky"} object={sky} />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]} >

            <primitive key={"myocean"} object={water} />

        </mesh>



        <mesh position={[0, 0, 0]} >

            <boxGeometry attach="geometry" args={[1000, 1000, 1000]} />
            <meshStandardMaterial attach="material" color={0x000000} />

        </mesh>

    </>);
}

