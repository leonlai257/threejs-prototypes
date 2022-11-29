import { Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import Logo from '@src/assets/Logo.png';
import { Navbar, NavbarInterface } from '@src/components/organisms';
import { styled } from '@stitches/react';

const navBar: NavbarInterface = {
    projectName: { name: 'Coreality', link: '/coreality' },
    items: [
        {
            name: 'Whitepaper',
            link: '/coreality',
        },
        {
            name: 'Documentation',
            link: '/coreality',
        },
        {
            name: 'Launch App',
            link: '/coreality',
        },
    ],
    launch: {
        name: '',
        link: '/',
    },
};

const UI = () => {
    const TopTitle = styled('div', {
        position: 'absolute',
        top: '0',
        left: '0',
    });

    return (
        <Html fullscreen zIndexRange={[100, 0]}>
            <main>
                <TopTitle>Welcome to Coreality!</TopTitle>
                <Navbar logo={Logo} navInfo={navBar} />
            </main>
        </Html>
    );
};

export default UI;
