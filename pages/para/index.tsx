import {
  Effects,
  Html,
  OrbitControls,
  PerspectiveCamera,
  Stars,
  Trail,
  useKeyboardControls,
  useScroll,
  useTexture,
} from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import UI from "./ui";
import WorldScene from "./worldScene";

const Coreality = () => {
  const [scene, setScene] = useState<THREE.Mesh>(null!);
  return (
    <>
      <OrbitControls />
      <PerspectiveCamera
        makeDefault
        fov={60}
        near={0.1}
        far={1000}
        position={[0, 2, 2]}
        rotation={[0, 0, 0]}
      />
      <WorldScene />
      <UI />
    </>
  );
};

export default Coreality;
