import { Canvas } from '@react-three/fiber';
import UI from 'components/ui';
import Config, { Lobby } from 'config/app';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import { Route, Switch } from 'wouter';
import Coreality from '.';
import '../styles/globals.css';
import RoomScene, { AnimationTypes } from './[roomId]';

export default function App({ pageProps }: AppProps) {
    const entryLobby: Lobby | undefined = Config.getEntryPoint();
    const [lobby] = useState<Lobby | undefined>(entryLobby);

    const [currentRoom, setCurrentRoom] = useState<string>('world');
    const [transition, setTransition] = useState<string>('');
    const [popup, setPopup] = useState<string>('');

    const [musicVolume, setMusicVolume] = useState(0.0);

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
                <title>CoReality Boilerplate</title>
                <meta
                    name="CoReality Boilerplate"
                    content="CoReality Boilerplate by Gusto"
                />
            </Head>
            <Canvas>
                <ambientLight />
                <directionalLight position={[0, 0, 0]} intensity={1} />
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
                        <RoomScene {...pageProps} />
                    </Route>
                </Switch>
                {/* <Component {...pageProps} /> */}
            </Canvas>
        </div>
    );
}
