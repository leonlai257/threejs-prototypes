import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Hotspot from 'components/hotspot';
import World from 'components/world';
import Config, { Lobby } from 'config/app';
import { useState } from 'react';
import { AxesHelper } from 'three';

export default function CoRealityApp() {
    const entryLobby: Lobby | undefined = Config.getEntryPoint();
    const [lobby] = useState<Lobby | undefined>(entryLobby);

    const radius = 10;

    return (
        <>
            <World
                radius={radius}
                imageUrl={lobby?.sphereImageUrl}
                videoUrl={lobby?.sphereVideoUrl}
                videoUrlLowRes={lobby?.sphereVideoUrlLowRes}
            />

            {/*START DEBUG AND TESTING */}
            <mesh>
                <sphereGeometry args={[radius, 36, 36]} />
                <meshStandardMaterial color="lime" wireframe={true} />
            </mesh>
            {/*END DEBUG AND TESTING */}

            {lobby?.hotspots?.map((hotspot, index) => (
                <Hotspot
                    key={index}
                    {...hotspot}
                    lobby={{ ...lobby, radius }}
                />
            ))}

            <primitive object={new AxesHelper(10)} />

            <OrbitControls position={[0, 0, 0.01]} enableZoom={true} />

            <PerspectiveCamera
                makeDefault
                fov={lobby?.defaultFov}
                near={0.1}
                far={1000}
                position={lobby?.defaultCameraPosition}
            />
        </>
    );
}
