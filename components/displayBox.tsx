import { useGLTF } from '@react-three/drei';
import { ThreeElements, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { anglesToXYZ } from './hotspot';
import Object3D, { Object3DProps } from './object3d';

import { Text } from '@react-three/drei';
import { HotspotAction } from 'config/app';
import * as THREE from 'three';
import { Euler } from 'three';
import ShaderHotspot from './shaderHotspot';

interface DisplayHotspotProps {
    slug: string;
    action: HotspotAction;
    param: string;
    position: [number, number, number];
    rotation: [number, number, number];
    setTransition?: (transition: string) => void;
    setPopup?: (popup: string) => void;
}

interface DisplayItemProps {
    slug: string;
    hDegree: number;
    vDegree: number;
    radius: number;
    scale: THREE.Vector3;
    setTransition?: (transition: string) => void;
    setPopup?: (popup: string) => void;
}
interface DisplayBoxProps extends Object3DProps {
    hotspotProps?: DisplayHotspotProps;
    displayItemProps: DisplayItemProps;
}

const defaultProps: DisplayBoxProps = {
    model: [
        {
            path: '/cowboy_hat.glb',
            node: 'hat_hat_0',
            material: 'material',
        },
    ],
    groupProps: {
        scale: [0.08, 0.08, 0.08],
        position: [0.8118169009, 0.1388263049, -0.3628781841],
    },
    meshProps: {
        rotation: [1.57 + Math.PI * 0.18, 0, -0.32],
    },
    hotspotProps: {
        slug: 'hat',
        action: HotspotAction.Transition,
        param: 'hat',
        position: [2, 0, -0.5],
        rotation: [-Math.PI / 2, 0, Math.PI / 2],
    },
    displayItemProps: {
        slug: 'hat',
        hDegree: 0,
        vDegree: 90,
        radius: 10,
        scale: new THREE.Vector3(0.7, 0.7, 0.7),
    },
};

const DisplayHotspot = (props: DisplayHotspotProps) => {
    props = { ...defaultProps.hotspotProps, ...props };

    const [, setShowInfo] = useState(false);
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
        <group
            onPointerOver={pointerOver}
            onPointerOut={pointerOut}
            onClick={() => onClick(props.param!)}
            rotation={props.rotation}
            position={props.position}
        >
            <group position={[0.4, 0.6, 0]}>
                <Object3D
                    model={[
                        {
                            path: '/nametag.glb',
                            node: 'Cube001',
                            material: 'Material.001',
                        },
                        {
                            path: '/nametag.glb',
                            node: 'Cube001_1',
                            material: 'back',
                        },
                    ]}
                    groupProps={{
                        rotation: [0, Math.PI / 2, Math.PI],
                        scale: 0.2,
                    }}
                    meshProps={{
                        scale: [2, 0.05, 5],
                    }}
                />
                <Text
                    fontSize={0.3}
                    position={[0, -0.02, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                >
                    {props.slug}
                </Text>
            </group>

            <group scale={0.3} position={[0.4, 0, 0]}>
                <ShaderHotspot />
            </group>
            {/* <mesh>
                <circleGeometry args={[0.3, 32]} />
                <meshBasicMaterial side={DoubleSide} color="hotpink" />
            </mesh> */}
        </group>
    );
};

const DisplayBox = (props: DisplayBoxProps) => {
    props = { ...defaultProps, ...props };
    const { groupProps, meshProps, displayItemProps: itemProps } = props;
    let i = 0;

    const { nodes, materials } = useGLTF(props.model[0].path);

    const meshList = props.model.map((model) => {
        return {
            node: model.node,
            material: model.material,
        };
    });

    const defaultSetting: ThreeElements['group'] = {
        position: anglesToXYZ(
            itemProps.hDegree,
            itemProps.vDegree,
            itemProps.radius,
        ),
        rotation: new Euler(0, Math.PI / 6, 0),
    };

    const displayRef = useRef<THREE.Group>(null!);
    // const [hoverUp, setHoverUp] = useState<boolean>(false);

    useFrame(() => {
        //floating animation for sneaker hologram
        displayRef.current.rotation.y += 0.01;
        // displayRef.current.position.y += hoverUp ? 0.0002 : -0.0002;
        // if (displayRef.current.position.y > 0.6) {
        //     setHoverUp(false);
        // }
        // if (displayRef.current.position.y < 0.5) {
        //     setHoverUp(true);
        // }
    });

    return (
        <group {...defaultSetting}>
            {props.hotspotProps?.setPopup &&
                props.hotspotProps.setTransition && (
                    <DisplayHotspot {...props.hotspotProps} />
                )}
            <group {...groupProps}>
                <Object3D
                    model={[
                        {
                            path: '/box.glb',
                            node: 'Cube_low005',
                            material: 'box',
                        },
                    ]}
                    groupProps={{
                        scale: [1, 1, 1],
                        position: [0, -1, 0],
                    }}
                    meshProps={{
                        rotation: [0, 0, 0],
                    }}
                />
                <group position={meshProps.position} ref={displayRef}>
                    <group
                        rotation={meshProps.rotation}
                        scale={meshProps.scale}
                    >
                        {meshList.map((mesh) => {
                            materials[mesh.material].depthWrite = true;
                            materials[mesh.material].depthTest = true;
                            return (
                                <mesh
                                    key={i++}
                                    castShadow
                                    receiveShadow
                                    geometry={
                                        (nodes[mesh.node] as THREE.Mesh)
                                            .geometry
                                    }
                                    material={materials[mesh.material]}
                                />
                            );
                        })}
                    </group>
                </group>
            </group>
        </group>
    );
};

const Hat = (props: DisplayItemProps) => {
    return (
        <DisplayBox
            displayItemProps={{
                slug: props.slug,
                hDegree: props.hDegree,
                vDegree: props.vDegree,
                radius: props.radius,
                scale: props.scale,
            }}
            model={[
                {
                    path: '/cowboy_hat.glb',
                    node: 'hat_hat_0',
                    material: 'material',
                },
            ]}
            groupProps={{
                scale: props.scale,
                rotation: [0, Math.PI / 2, 0],
                position: [0, 0, 0.7],
            }}
            meshProps={{
                position: [0.8, 2.2, -0.3],
                rotation: [-Math.PI / 2, 0, 0],
                scale: 0.5,
            }}
            hotspotProps={{
                slug: 'Hat',
                action: HotspotAction.Transition,
                param: props.slug,
                position: [-2.2, 0, -0.5],
                rotation: [-Math.PI / 2, 0, -Math.PI / 2],
                setPopup: props.setPopup,
                setTransition: props.setTransition,
            }}
        />
    );
};

const Glasses = (props: DisplayItemProps) => {
    return (
        <DisplayBox
            displayItemProps={{
                slug: props.slug,
                hDegree: props.hDegree,
                vDegree: props.vDegree,
                radius: props.radius,
                scale: props.scale,
            }}
            model={[
                {
                    path: '/sunglasses_free.glb',
                    node: 'defaultMaterial',
                    material: 'Material__385',
                },
            ]}
            groupProps={{
                scale: props.scale,
                rotation: [0, Math.PI / 2, 0],
                position: [0, 0, 0.7],
            }}
            meshProps={{
                position: [1, 2, -0.4],
                rotation: [0, 0, 0],
                scale: 0.5,
            }}
            hotspotProps={{
                slug: 'Glasses',
                action: HotspotAction.Transition,
                param: props.slug,
                position: [-2.2, 0, -0.5],
                rotation: [-Math.PI / 2, 0, -Math.PI / 2],
                setPopup: props.setPopup,
                setTransition: props.setTransition,
            }}
        />
    );
};

const OxfordShoe = (props: DisplayItemProps) => {
    return (
        <DisplayBox
            displayItemProps={{
                slug: props.slug,
                hDegree: props.hDegree,
                vDegree: props.vDegree,
                radius: props.radius,
                scale: props.scale,
            }}
            model={[
                {
                    path: '/old_oxford_shoe.glb',
                    node: 'Object_2',
                    material: 'sh_oldOxfordShoe',
                },
            ]}
            groupProps={{
                scale: props.scale,
                rotation: [0, Math.PI / 2, 0],
            }}
            meshProps={{
                position: [1, 1.8, -0.3],
                rotation: [-Math.PI / 2, 0, 0],
                scale: 8,
            }}
            hotspotProps={{
                slug: 'Oxford Shoe',
                action: HotspotAction.Transition,
                param: props.slug,
                position: [1.5, 0, -0.5],
                rotation: [-Math.PI / 2, 0, Math.PI / 2],
                setPopup: props.setPopup,
                setTransition: props.setTransition,
            }}
        />
    );
};

const RedShoe = (props: DisplayItemProps) => {
    return (
        <DisplayBox
            displayItemProps={{
                slug: props.slug,
                hDegree: props.hDegree,
                vDegree: props.vDegree,
                radius: props.radius,
                scale: props.scale,
            }}
            model={[
                {
                    path: '/red_high-heel_shoes.glb',
                    node: 'defaultMaterial',
                    material: 'Shoes',
                },
                {
                    path: '/red_high-heel_shoes.glb',
                    node: 'defaultMaterial_1',
                    material: 'Shoes',
                },
                {
                    path: '/red_high-heel_shoes.glb',
                    node: 'defaultMaterial_2',
                    material: 'Shoes',
                },
            ]}
            groupProps={{
                scale: props.scale,
                rotation: [0, Math.PI / 2, 0],
            }}
            meshProps={{
                position: [0.8, 2.2, -0.3],
                rotation: [0, -Math.PI / 2, 0],
            }}
            hotspotProps={{
                slug: 'Red Shoe',
                action: HotspotAction.Transition,
                param: props.slug,
                position: [1.5, 0, -0.5],
                rotation: [-Math.PI / 2, 0, Math.PI / 2],
                setPopup: props.setPopup,
                setTransition: props.setTransition,
            }}
        />
    );
};

const Bag = (props: DisplayItemProps) => {
    return (
        <DisplayBox
            displayItemProps={{
                slug: props.slug,
                hDegree: props.hDegree,
                vDegree: props.vDegree,
                radius: props.radius,
                scale: props.scale,
            }}
            model={[
                {
                    path: '/v_handbag.glb',
                    node: 'defaultMaterial004',
                    material: 'Texture_3',
                },
                {
                    path: '/v_handbag.glb',
                    node: 'defaultMaterial004_1',
                    material: 'Texture_2',
                },
                {
                    path: '/v_handbag.glb',
                    node: 'defaultMaterial004_2',
                    material: 'Texture_1',
                },
                {
                    path: '/v_handbag.glb',
                    node: 'defaultMaterial004_3',
                    material: 'Texture_4',
                },
            ]}
            groupProps={{
                scale: props.scale,
                rotation: [0, Math.PI / 2, 0],
            }}
            meshProps={{
                position: [1, 2.8, -0.3],
                rotation: [0, Math.PI / 2, 0],
            }}
            hotspotProps={{
                slug: 'Bag',
                action: HotspotAction.Transition,
                param: props.slug,
                position: [1.5, 0, -0.5],
                rotation: [-Math.PI / 2, 0, Math.PI / 2],
                setPopup: props.setPopup,
                setTransition: props.setTransition,
            }}
        />
    );
};

const DisplayBoxController = (props: DisplayItemProps) => {
    const { slug } = props;
    switch (slug) {
        case 'hat':
            return <Hat {...props} />;
        case 'glasses':
            return <Glasses {...props} />;
        case 'oxford-shoe':
            return <OxfordShoe {...props} />;
        case 'red-shoe':
            return <RedShoe {...props} />;
        case 'bag':
            return <Bag {...props} />;
    }
    return <></>;
};

export default DisplayBox;
export { DisplayBoxController };
