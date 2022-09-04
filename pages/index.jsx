import { Canvas } from "@react-three/fiber";
import { World } from '@/world/basic';
import { WorldControls } from '@/world/controls';
import { At0_0 } from '@/islands/at0_0';

/**
 * 
 * Note: Do not edit this page. It is a template for the world.
 */

export default function Index() {

    return (<>

        <div style={{ width: "100vw", height: "100vh" }}>

            <Canvas style={{ background: "#171717" }} camera={{ fov: 55, near: 1, far: 20000, position: [30, 30, 100] }}>

                <World />
                <WorldControls cords={[0, 0, 0]} angles={[0, 0, 0]} />
                <At0_0></At0_0>


            </Canvas>


        </div>

    </>)

}