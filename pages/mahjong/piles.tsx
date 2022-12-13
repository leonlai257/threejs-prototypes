import type { NextPage } from 'next';
import Mahjong from './mahjong';

export interface PilesProps {
    id: number;
}

const Piles = (props: PilesProps[]) => {
    const player_one_piles = props;
    console.log(player_one_piles);
    return (
        <>
            (
            {player_one_piles.map((pile) => (
                <Mahjong
                    key={pile.id}
                    meshProps={{
                        position: [
                            -0.28 +
                                (player_one_piles.findIndex(
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

export default Piles;
