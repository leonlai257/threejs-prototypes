import { Html } from '@react-three/drei';
import { ThreeElements, useFrame } from '@react-three/fiber';
import { Dialog } from '@src/components/atoms/dialog';
import { Container } from '@src/components/atoms/container';
import { styled } from '@stitches/react';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import * as THREE from 'three';

export enum actionType {
    route = 'route',
    dialog = 'dialog',
    focus = 'focus',
    room = 'room',
}

export interface ItemsProps {
    title: string;
    meshProps: ThreeElements['group'];
    event: { action: actionType; param: string };
}

export interface HotSpotProps {
    items: ItemsProps[];
    transition: () => void;
}

const HotSpots = (props: HotSpotProps) => {
    const hotspotRef = useRef<THREE.Group>(null!);
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);
    const router = useRouter();

    const Text = styled('div', {
        whiteSpace: 'nowrap',
    });

    const Button = styled('button', {
        backgroundColor: 'black',
        borderRadius: '4rem',
        'min-width': '64px',
        'min-height': '64px',
        border: '0',
        rounded: 'full',
        fontSize: '48px',
        '&:hover': {
            backgroundColor: 'yellow',
        },
    });

    // useFrame(() => {
    //     hotspotRef.current.rotation.y += 0.01;
    // });

    return (
        <group>
            {props.items.map((item, index) => {
                return (
                    <group
                        ref={hotspotRef}
                        key={index}
                        rotation={item.meshProps.rotation}
                        position={[0, 0, 0]}>
                        <group position={item.meshProps.position}>
                            <Html position={[0, 0.05, 0]}>
                                <Text>
                                    {item.title
                                        ? item.title
                                        : `Unnamed hotspot ${index}`}
                                </Text>
                            </Html>
                            <Html position={[-0.3, -0.1, 0]}>
                                <Dialog>
                                    <Text>
                                        {item.event.action === 'dialog' &&
                                        clicked
                                            ? item.event.param
                                            : ''}
                                    </Text>
                                </Dialog>
                            </Html>
                            <Html key={index}>
                                <Button
                                    onClick={() => {
                                        if (item.event.action === 'room') {
                                            props.transition();
                                        }
                                        click(!clicked);
                                        if (item.event.action === 'route') {
                                            router.push(item.event.param);
                                        }
                                    }}>
                                    {item.event.action === 'route'
                                        ? item.event.param
                                        : '+'}
                                </Button>
                            </Html>
                        </group>
                    </group>
                );
            })}
        </group>
    );
};

export default HotSpots;
