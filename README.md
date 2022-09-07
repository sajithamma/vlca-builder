# Volcano Builder
## React Fiber based builder for vlca.no

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## Screenshot

![alt Screenshot](/screenshot.png)


## Prerequisites

You need to install:

- Node / NPM https://nodejs.org/en/download/package-manager/
- GIT https://git-scm.com/downloads
- Any editor like VS-Code https://code.visualstudio.com/download

## Install Steps

```javascript
git clone git@github.com:sajithamma/vlca-builder.git
cd vlca-builder
//checkout to a new branch with your name
git checkout -b <yourname>
//example:  git checkout -b john
npm install
```
## Run 

```bash
npm run dev
```
`Note`: NodeJs server will run at port 8000, access http://localhost:3000 from the browser to see the default scene)

## Change / Add new models

- Edit islands/at0_0.jsx file.
- Refer react fiber for components usage and documentation  https://github.com/pmndrs/react-three-fiber
- See the live changes in http://localhost:3000.
- Some cases you need to stop the server ( Ctrl+Z) and rerun the command "npm run dev"


### Commit the changes

```javascript
git status
git add 'filename'
git commit -m "your message here"
git push origin <your-branch-name>
//example:  git push origin john
```

## Some Examples of React Three Fiber
###  Cube / Box
```javascript
 <mesh >
        <boxBufferGeometry attach="geometry" args={[10, 10, 10]} />
        <meshStandardMaterial attach="material" color="blue" />
</mesh>
```

###  Load a GLTF Model
```javascript
const gltf = useGLTF('/assets/gltf/boat/scene.gltf');
<group ref={boatRef} scale={4} position={[-100, 19, -50]}>
    <Suspense fallback={<Loading />}>
        <primitive object={gltf.scene} dispose={null} />
    </Suspense>
 </group>
```

###  Cone
```javascript
  <mesh position={[0, 2, 0]} castShadow>
        <coneBufferGeometry args={[2, 8, 8]} />
        <meshStandardMaterial color="red" metalness={0.7} roughness={0.1} />
    </mesh>
```

###  Circle
```javascript
 <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 1, 0]}>
    <circleBufferGeometry attach="geometry" args={[100, 64]} />
    <meshBasicMaterial attach="material" map={texture} side={THREE.DoubleSide} />
</mesh>
```

###  Positional/ Directional Audio
```javascript
    const sound = useRef();
    const [listener] = useState(() => new THREE.AudioListener());
    const [buffer] = useState(() => useLoader(THREE.AudioLoader, url));
    <positionalAudio ref={sound} args={[listener]}  ></positionalAudio>
```

## Also Refer

- @react-three/drei https://www.npmjs.com/package/@react-three/drei


## About Volcano

Volcano Islands is a world where social media, entertainment, and gaming merge into an interconnected, interoperable virtual experience. We are aiming to bring a paradigm shift in how humans interact in the world of entertainment.
https://vlca.no



```