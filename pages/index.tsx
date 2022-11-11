import { Canvas, invalidate, useThree } from '@react-three/fiber';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Table from './table';
import Mahjong from './mahjong';
import Piles from './piles';
import { useState } from 'react';
import create from 'zustand';

const [hand, setHand] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
]);

const [piles, setPile] = useState([]);

const onHandClick = (id: number) => {
    console.log('Player hand tile ', id);
    const index = hand.findIndex((tile: any) => tile.id === id);
    if (index !== -1) {
        setPile((piles: any) => [...piles, hand[index]]);
        setHand((hand: any) => hand.filter((tile: any) => tile.id !== id));
        // player_one_piles.push(hand.splice(index, 1)[0]);
    }
};

// const useHandStore = create((set) => ({
//     hand: [],
//     addHand: (id: number, position: { x: number; y: number; z: number }) =>
//         set((state: any) => ({
//             mahjongs: [...state.mahjongs, { id: id, position: position }],
//         })),
//     getHand: () => hand,
// }));

const usePileStore = create((set) => ({
    piles: [],
    addPile: (id: number) =>
        set((state: any) => ({ piles: [...state.piles, { id: id }] })),
}));

// const

const Home: NextPage = () => {
    // const addMahjong = useMahjongStore((state: any) => state.addMahjong);
    // const handStore = useHandStore();

    return (
        <>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Table position={[0, 0, 0]} />(
            {hand.map((tile) => (
                <Mahjong
                    meshProps={{
                        position: [-0.28 + (tile.id - 1) * 0.04, 1.024, 1],
                        onClick: () => onHandClick(tile.id),
                    }}
                />
            ))}
            {/* {player_one_piles.map((tile) => (
                <Mahjong
                    position={[-0.28 + (tile.id - 1) * 0.04, 1.024, 0.6]}
                    rotation={[0, Math.PI, 0]}
                />
            ))} */}
            {<Piles piles={piles} />})
        </>
    );
};

export default Home;
