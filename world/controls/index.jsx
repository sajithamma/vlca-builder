import { FirstPersonControls, OrbitControls, FlyControls } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import { VolcanoPointerControl } from '@/world/controls/VolcanoPointerControl';
import { Pov } from '@/world/controls/pov';


export const WorldControls = (props, speed = 100) => {


    const controlFlyRef = useRef();

    //Camcontroller ref  (camera-control npm), but disabled npw
    const cameraControls = useRef(null);
    const DEG45 = Math.PI / 4;

    const [isPointerControl, setPointerControl] = useState(false);
    const [isFlyControl, setFlyControl] = useState(true);


    //For orbit controls
    const controlsRef = useRef();
    const state = useThree();

    useEffect(() => {


        window.controlFlyRef = controlFlyRef.current;

        //@todo, move to state hook, instead of window

        window.setPointerControl = setPointerControl;
        window.setFlyControl = setFlyControl;

        if (isPointerControl) {
            state.camera.rotation.set(0, 0, 0);
        }

    }, [])


    return (<>


        {isPointerControl ? (<Pov />) : (<></>)}


        {isFlyControl ?

            <FlyControls

                movementSpeed={80}
                rollSpeed={Math.PI / 12}
                autoForward={false}
                dragToLook={true}
                mouseStatus={0}
                ref={controlFlyRef}
                enabled={false}

            />


            : null}



        {isPointerControl ? <VolcanoPointerControl /> : null}


    </>)

}