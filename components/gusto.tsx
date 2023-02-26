import { ThreeElements } from '@react-three/fiber';
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

const GustoLogo = (props: GustoLogoProps) => {
    props = { ...defaultProps, ...props };
    const { hDegree, vDegree, radius } = props;

    const defaultSetting: ThreeElements['group'] = {
        position: anglesToXYZ(hDegree, vDegree, radius),
        rotation: new Euler(0, Math.PI / 6, 0),
        scale: 0.7,
    };

    return (
        <group {...defaultSetting}>
            <Object3D
                model={[
                    {
                        path: '/gusto.glb',
                        node: 'Text',
                        material: 'Material.001',
                    },
                ]}
                groupProps={{
                    scale: 2,
                    rotation: [0, 0, 0],
                }}
                meshProps={{
                    rotation: [Math.PI / 2, 0, Math.PI],
                    position: [0, 0, 0],
                }}
            />
        </group>
    );
};

export default GustoLogo;
