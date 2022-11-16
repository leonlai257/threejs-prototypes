import type { NextPage } from 'next';
import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import * as THREE from 'three';
import { ThreeElements, useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';

interface CylinderProps {
    position: THREE.Vector3;
    material: ThreeElements['mesh']['material'];
}

const cylinderGeometry = new THREE.CylinderGeometry(0.02, 0.02, 4, 32);
// const colors = [
//     new THREE.MeshLambertMaterial({
//         color: 0x8eb0f5,
//         emissive: 0x8eb0f5,
//         emissiveIntensity: 1,
//     }),
//     new THREE.MeshLambertMaterial({
//         color: 0xb08ef5,
//         emissive: 0xb08ef5,
//         emissiveIntensity: 1,
//     }),
// ];
const colors = [
    {
        color: 0x8eb0f5,
        emissive: 0x8eb0f5,
        emissiveIntensity: 1,
    },
    {
        color: 0xb08ef5,
        emissive: 0xb08ef5,
        emissiveIntensity: 1,
    },
];

const Cylinder = (props: ThreeElements['mesh']) => {
    const ref = useRef();

    useFrame((_, delta) => {
        ref.current.position.x += 50 * delta;
        ref.current.updateMatrix();
        if (ref.current.position.x > 100) {
            ref.current.position.x = -100;
        }
    });

    return (
        <mesh
            {...props}
            ref={ref}
            geometry={cylinderGeometry}
            rotation={[0, 0, Math.PI / 2]}>
            <meshLambertMaterial attach={'material'} args={[props.material]} />
        </mesh>
    );
};

function r() {
    return Math.max(0.08, Math.random());
}

const CylinderGroup = () => {
    let cylinders: CylinderProps[] = [];
    const cylinderCount = 2000;
    const radius = 72;

    for (let i = 0; i < cylinderCount; i++) {
        cylinders.push({
            position: new THREE.Vector3(
                (Math.random() - 0.5) * 200,
                Math.cos(i * 10 * 2) * radius * r(),
                Math.sin(i * 10 * 2) * radius * r()
            ),
            material: colors[Math.floor(Math.random() * colors.length)],
        });
    }

    const scroll = useScroll();
    const cylinderGroup = useRef();
    useFrame(() => {
        const r1 = scroll.range(0 / 2, 2 / 2);
        const text1 = scroll.visible(1 / 2, 2 / 2);
        cylinderGroup.current.position.x = 20 - r1 * 100;
    });

    return (
        <group ref={cylinderGroup}>
            {cylinders.map((cylinder, index) => {
                return (
                    <Cylinder
                        key={index}
                        position={cylinder.position}
                        material={cylinder.material}
                    />
                );
            })}
        </group>
    );
};

export default CylinderGroup;
