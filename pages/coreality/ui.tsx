import {
  Effects,
  Html,
  Stars,
  Trail,
  useKeyboardControls,
  useScroll,
  useTexture,
} from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { DoubleSide } from "three";

const UI = () => {
  return (
    <Html>
      <h1>Welcome to Coreality!</h1>
    </Html>
  );
};

export default UI;
