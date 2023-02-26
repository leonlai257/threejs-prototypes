import { useGLTF } from '@react-three/drei';
import { ThreeElements } from '@react-three/fiber';

export interface Object3DProps {
    model: {
        path: string;
        node: string;
        material: string;
    }[];
    groupProps: ThreeElements['group'];
    meshProps: ThreeElements['mesh'];
}

const defaultProps: Object3DProps = {
    model: [
        {
            path: '/sneaker.gltf',
            node: 'Sneaker',
            material: 'Hologram',
        },
    ],
    groupProps: {
        scale: [0.08, 0.08, 0.08],
        position: [0.8118169009, 0.1388263049, -0.3628781841],
    },
    meshProps: {
        rotation: [1.57 + Math.PI * 0.18, 0, -0.32],
    },
};

const Object3D = (props: Object3DProps) => {
    props = { ...defaultProps, ...props };
    const { model, meshProps, groupProps } = props;
    const { nodes, materials } = useGLTF(model[0].path);
    if (model[0].path === '/nametag.glb') {
        (
            materials[model[0].material] as THREE.MeshStandardMaterial
        ).roughness = 0.6;
    }
    if (model[0].path === '/gusto.glb') {
        (
            materials[model[0].material] as THREE.MeshStandardMaterial
        ).roughness = 0.7;
    }

    return (
        <group {...groupProps}>
            {props.model.map((model) => {
                return (
                    <mesh
                        key={model.node}
                        castShadow
                        receiveShadow
                        geometry={(nodes[model.node] as THREE.Mesh).geometry}
                        material={materials[model.material]}
                        {...meshProps}
                    />
                );
            })}
        </group>
    );
};

export default Object3D;
