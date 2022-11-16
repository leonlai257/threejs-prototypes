import type { NextPage } from 'next';
import Table from './table';
import Mahjong from './mahjong';
import { PilesProps } from './piles';
import React, { useState } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

interface HandProps {
    id: number;
}

const Home: NextPage = () => {
    const [pool, setPool] = useState([]);

    const [hand, setHand] = useState<HandProps[]>([
        // { id: 1 },
        // { id: 2 },
        // { id: 3 },
        // { id: 4 },
        // { id: 5 },
        // { id: 6 },
        // { id: 7 },
        // { id: 8 },
        // { id: 9 },
        // { id: 10 },
        // { id: 11 },
        // { id: 12 },
        // { id: 13 },
    ]);

    const [piles, setPile] = useState<PilesProps[]>([]);

    const onHandClick = (id: number) => {
        console.log('Player hand tile ', id);
        const index = hand.findIndex((tile: any) => tile.id === id);
        if (index !== -1) {
            setPile([...piles, hand[index]]);
            setHand((hand: any[]) =>
                hand.filter((tile: any) => tile.id !== id)
            );
        }
    };

    return (
        <>
            <OrbitControls />
            <PerspectiveCamera
                makeDefault
                fov={60}
                near={0.1}
                far={1000}
                position={[0, 2, 2]}
                rotation={[0, 0, 0]}
            />
            <Table position={[0, 0, 0]} />(
            {hand.map((tile) => (
                <Mahjong
                    meshProps={{
                        position: [-0.28 + (tile.id - 1) * 0.04, 1.024, 1],
                        onClick: () => onHandClick(tile.id),
                    }}
                />
            ))}
            {piles.map((pile) => (
                <Mahjong
                    key={pile.id}
                    meshProps={{
                        position: [
                            -0.28 +
                                (piles.findIndex(
                                    (tile) => tile.id === pile.id
                                ) -
                                    1) *
                                    0.04,
                            1.024,
                            0.6,
                        ],
                        rotation: [Math.PI / 2, 0, 0],
                    }}
                    isPile={true}
                />
            ))}
            )
        </>
    );
};

export default Home;
