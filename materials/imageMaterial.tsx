import { useTexture } from '@react-three/drei';
import { BackSide } from 'three';

function ImageMaterial({ url }: { url: string }) {
    const texture = useTexture(url);
    return (
        <meshBasicMaterial
            transparent={true}
            map={texture}
            toneMapped={false}
            side={BackSide}
        />
    );
}

export default ImageMaterial;
