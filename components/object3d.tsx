import { useGLTF } from '@react-three/drei';
import { ThreeElements, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';

export interface Object3DProps {
    model: {
        path: string;
        node: string;
        material: string;
    };
    groupProps: ThreeElements['group'];
    meshProps: ThreeElements['mesh'];
}

const defaultProps: Object3DProps = {
    model: {
        path: '/sneaker.gltf',
        node: 'Sneaker',
        material: 'Hologram',
    },
    groupProps: {
        scale: [0.08, 0.08, 0.08],
        position: [0.8118169009, 0.1388263049, -0.3628781841],
    },
    meshProps: {
        rotation: [1.57 + Math.PI * 0.18, 0, -0.32],
    },
};

const Object3D = (props: Object3DProps) => {
    const { model, meshProps } = props;
    const { nodes, materials } = useGLTF(model.path);
    (
        materials[model.material] as THREE.MeshStandardMaterial
    ).emissiveIntensity = 1;

    return (
        <mesh
            castShadow
            receiveShadow
            geometry={(nodes[model.node] as THREE.Mesh).geometry}
            material={materials[model.material]}
            {...meshProps}
        />
    );
};

const Sneaker = (props: Object3DProps) => {
    props = { ...defaultProps, ...props };
    const { groupProps } = props;

    const sneakerRef = useRef<THREE.Group>(null!);
    const [hoverUp, setHoverUp] = useState<boolean>(false);

    useFrame(() => {
        //floating animation for sneaker hologram
        sneakerRef.current.rotation.y += 0.01;

        sneakerRef.current.position.y += hoverUp ? 0.0002 : -0.0002;
        if (sneakerRef.current.position.y > 0.6) {
            setHoverUp(false);
        }
        if (sneakerRef.current.position.y < 0.5) {
            setHoverUp(true);
        }
    });

    return (
        <group {...groupProps} ref={sneakerRef}>
            <Object3D {...props} />
        </group>
    );
};

export default Object3D;
export { Sneaker };
