import { Canvas } from '@react-three/fiber';
import NavBarComponent from 'components/navBar';
import UI from 'components/ui';
import Config, { Lobby } from 'config/app';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Route, Switch } from 'wouter';
import Coreality from '.';
import '../styles/globals.css';
import RoomScene, { AnimationTypes } from './[roomId]';
import Information from 'components/information';
import Entrance from 'components/entrance';
import { globalStyles } from '@src/stitches.config';

export default function App({ pageProps }: AppProps) {
    const [showInfo, setShowInfo] = useState(false);
    const [atEntrance, setAtEntrance] = useState(true);
    const entryLobby: Lobby | undefined = Config.getEntryPoint();
    const [lobby] = useState<Lobby | undefined>(entryLobby);

    const [currentRoom, setCurrentRoom] = useState<string>('world');
    const [transition, setTransition] = useState<string>('');
    const [popup, setPopup] = useState<string>('');

    const [musicVolume, setMusicVolume] = useState(1.0);

    const [animation, setAnimation] = useState<AnimationTypes>(
        AnimationTypes.FADEOUT,
    );

    const globalStates = {
        currentRoom,
        setCurrentRoom,
        transition,
        setTransition,
        popup,
        setPopup,
        musicVolume,
        setMusicVolume,
        animation,
        setAnimation,
    };

    pageProps = {
        ...pageProps,
        ...globalStates,
    };

    useEffect(() => {
        globalStyles();
    }, []);

    useEffect(() => {
        console.log('Music volume:', musicVolume);
    }, [musicVolume]);

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            }}
        >
            <Head>
                <title>three.js prototype</title>
                <meta name="three.js prototype" content="three.js prototype" />
            </Head>
            <Canvas>
                <ambientLight />
                <pointLight position={[0, 10, 0]} intensity={1} castShadow />
                <pointLight position={[0, -5, 0]} intensity={1} />
                <UI
                    popupUrl={popup}
                    room={currentRoom}
                    navBar={lobby?.navBar}
                    {...pageProps}
                />
                <Switch>
                    <Route path="/">
                        <Coreality {...pageProps} />
                    </Route>
                    <Route path="/:roomId">
                        <RoomScene {...pageProps} rooms={lobby?.rooms} />
                    </Route>
                </Switch>
            </Canvas>
            {atEntrance && <Entrance enter={setAtEntrance} />}
            <NavBarComponent
                soundSetter={setMusicVolume}
                infoSetter={setShowInfo}
            />
            <Information show={showInfo} />
        </div>
    );
}
