import type { NextPage } from 'next';
import Mahjong from './mahjong';

interface pilesProps {
    piles: { id: number }[];
}

const Piles = (props: pilesProps) => {
    const player_one_piles = props.piles;
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
