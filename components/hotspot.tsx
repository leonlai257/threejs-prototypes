import { Billboard, Text } from '@react-three/drei';
import { HotspotAction } from 'config/app';
import { useState } from 'react';
import { DoubleSide, Vector3 } from 'three';

export interface HotspotProps {
    slug: string;
    action: HotspotAction;
    param: string;
    vDegree: number;
    hDegree: number;
    isHtml: string;
    radius: number;
    setTransition?: (transition: string) => void;
    setPopup?: (popup: string) => void;
}

const defaultProps = {
    slug: '',
    hDegree: 0,
    vDegree: 90,
    radius: 10,
};

export function anglesToXYZ(
    hDegree?: number,
    vDegree?: number,
    radius?: number,
) {
    hDegree = hDegree ? hDegree : 0;
    vDegree = vDegree ? vDegree : 0;
    radius = radius ? radius : 0;

    radius *= 0.95;

    const phi = (hDegree * Math.PI) / 180;
    const theta = (vDegree * Math.PI) / 180;
    const vector = [
        radius * Math.cos(phi) * Math.sin(theta),
        radius * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
    ];
    return new Vector3(...vector);
}

const Hotspot = (props: Partial<HotspotProps>) => {
    props = { ...defaultProps, ...props };

    const [showInfo, setShowInfo] = useState(false);
    const [showText, setShowText] = useState(false);

    const pointerOver = () => {
        setShowInfo(true);
    };
    const pointerOut = () => {
        setShowInfo(false);
    };

    const onClick = (param: string) => {
        switch (props.action) {
            case 'transition':
                props.setTransition && props.setTransition(param);
                break;
            case 'popup':
                props.setPopup && props.setPopup(param);
                break;
            case 'text':
                setShowText(!showText);
                break;
        }
    };

    return (
        <>
            {
                <Billboard
                    onPointerOver={pointerOver}
                    onPointerOut={pointerOut}
                    onClick={() => onClick(props.param!)}
                    position={anglesToXYZ(
                        props.hDegree,
                        props.vDegree,
                        props.radius,
                    )}
                >
                    {showInfo ? (
                        <Text fontSize={0.3} position={[0, 1, 0]}>
                            {props.vDegree}, {props.hDegree}
                        </Text>
                    ) : null}

                    {showText ? (
                        <Text fontSize={0.3} position={[0, -1, 0]}>
                            {props.param}
                        </Text>
                    ) : null}

                    <Text fontSize={0.3} position={[0, 0.6, 0]}>
                        {props.slug}
                    </Text>

                    <Text fontSize={0.3} position={[0, 0, 0]}>
                        {'+'}
                    </Text>
                    <mesh>
                        <circleGeometry args={[0.3, 32]} />
                        <meshBasicMaterial side={DoubleSide} color="hotpink" />
                    </mesh>
                </Billboard>
            }
        </>
    );
};

export default Hotspot;
