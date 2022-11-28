import {
    Effects,
    Html,
    Stars,
    Trail,
    useKeyboardControls,
    useScroll,
    useTexture,
} from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { styled } from '@stitches/react';
import { useRef, useState } from 'react';
import * as THREE from 'three';

const UI = () => {
    const { viewport } = useThree();

    const NavBar = styled('div', {
        position: 'absolute',
        bottom: '0',
        left: '0',
    });

    const TopTitle = styled('div', {
        position: 'absolute',
        top: '0',
        left: '0',
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
    return (
        <Html fullscreen zIndexRange={[100, 0]}>
            <TopTitle>Welcome to Coreality!</TopTitle>
            <NavBar>
                <Button>NavBar</Button>
            </NavBar>
        </Html>
    );
};

export default UI;
