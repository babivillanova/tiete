import "./Home.css";
import * as THREE from "three";
import { Suspense, useState, useRef } from "react";
import { Canvas, useLoader, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Float } from "@react-three/drei";
import TypewriterComponent from "../components/Typewriter";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

useGLTF.preload("/tiete.glb");

export default function Home2() {
  return (
    <div className="container">
      <TypewriterComponent />
      <div className="container_canvas">
        <Canvas>
          <fog attach="fog" args={["black", 15, 20]} />
          <ambientLight intensity={0.1} />
          <spotLight position={[0, 10, 0]} intensity={0.3} />
          <directionalLight position={[-50, 0, -40]} intensity={0.7} />
          <Suspense fallback={null}>
            <Float
              speed={1} // Animation speed, defaults to 1
              rotationIntensity={1} // XYZ rotation intensity, defaults to 1
              floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
              floatingRange={[1, 10]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
            >
              <Rig>
                <Model position={[0, 0, 0]} />
              </Rig>
            </Float>

            {/* <OrbitControls /> */}
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

const Model = () => {
  const gltf = useLoader(GLTFLoader, "./tiete.glb");
  return (
    <>
      <primitive object={gltf.scene} scale={0.55} />
    </>
  );
};

function Rig({ children }) {
  const ref = useRef();
  const vec = new THREE.Vector3();
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, 0, 3.5), 0.05);
    ref.current.position.lerp(vec.set(mouse.x * 1, mouse.y * 0.1, 0), 0.1);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (-mouse.x * Math.PI) / 20, 0.1);
  });
  return <group ref={ref}>{children}</group>;
}
