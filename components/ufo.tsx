import { ThreeElements, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Euler } from 'three';
import { anglesToXYZ } from './hotspot';
import Object3D from './object3d';

export interface GustoLogoProps {
    hDegree: number;
    vDegree: number;
    radius: number;
}

const defaultProps: GustoLogoProps = {
    hDegree: 0,
    vDegree: 0,
    radius: 0,
};

const UFO = (props: GustoLogoProps) => {
    props = { ...defaultProps, ...props };
    const { hDegree, vDegree, radius } = props;
    const pathRef = useRef<THREE.Group>(null!);

    const defaultSetting: ThreeElements['group'] = {
        position: anglesToXYZ(hDegree, vDegree, radius),
        rotation: new Euler(0, Math.PI / 6, 0),
        scale: 0.1,
    };

    const [ufoRotation, setRotation] = useState<number>(0);

    useFrame(() => {
        pathRef.current.rotation.y += 0.01;
        setRotation(ufoRotation + Math.PI / 60);
        // ufoRef.current.rotation.y += 0.01;
    });

    return (
        <group {...defaultSetting}>
            <group ref={pathRef}>
                <Object3D
                    model={[
                        {
                            path: '/ufo.glb',
                            node: 'Mesh',
                            material: 'Glass_r2',
                        },
                        {
                            path: '/ufo.glb',
                            node: 'Mesh_1',
                            material: 'Glass2',
                        },
                        {
                            path: '/ufo.glb',
                            node: 'Mesh_2',
                            material: 'Material.002',
                        },
                        {
                            path: '/ufo.glb',
                            node: 'Mesh_3',
                            material: 'Material.003',
                        },
                    ]}
                    groupProps={{
                        scale: 1.8,
                    }}
                    meshProps={{
                        rotation: [Math.PI / 2, 0, Math.PI - ufoRotation],
                        position: [14, 0, 0],
                    }}
                />
            </group>
        </group>
    );
};

export default UFO;
