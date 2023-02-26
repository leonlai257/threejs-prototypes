import { PopupInfoProps } from 'components/callToAction';
import * as THREE from 'three';

interface ConfigHelperInterface {
    getEntryPoint: () => Lobby | undefined;
    getLobby: (slug: string) => Lobby | undefined;
}

const ConfigHelper: ConfigHelperInterface = {
    getEntryPoint: () => {
        return Config.lobbies.find((lobby) => lobby.isEntryPoint);
    },
    getLobby: (slug: string) => {
        return Config.lobbies.find((lobby) => lobby.slug === slug);
    },
};

export interface Lobby {
    slug: string;
    isEntryPoint: boolean;
    sphereImageUrl: string;
    sphereVideoUrl: string;
    sphereVideoUrlLowRes: string;
    defaultFov: number;
    defaultCameraPosition: THREE.Vector3;
    hotspots: Hotspot[];
    navBar: Navbar;
    rooms: RoomItem[];
    audios: audio[];
    radius?: number;
}

export enum HotspotAction {
    Popup = 'popup',
    Transition = 'transition',
    Text = 'text',
}

export interface Hotspot {
    slug: string;
    action: HotspotAction;
    param: string;
    vDegree: number;
    hDegree: number;
}

export interface NavItem {
    slug: string;
    transitionTarget: string;
}

export interface Navbar {
    projectName: string;
    items: NavItem[];
}

export enum RoomType {
    Video = 'video',
    Image = 'image',
}

export interface RoomItem {
    slug: string;
    popupInfo?: PopupInfoProps;
    url?: string;
    type?: RoomType;
    onBack?: () => void;
}
export interface Rooms {
    rooms: RoomItem[];
    currentRoom: string;
}
export interface audio {
    name: string;
    url: string;
    position: [number, number, number];
    rotation: [number, number, number];
}

// for debug/testing
// const getHotspots = ()=>{
//   const arr = [];
//   for(let i = -360; i < 360; i++){
//     arr.push({
//       slug: 'h1',
//       action: '',
//       actionTarget: '',
//       vDegree: 90,
//       hDegree: i,
//     })
//   }
//   return arr;
// }

const Config = {
    lobbies: [
        {
            slug: 'entrance',
            isEntryPoint: true,
            sphereImageUrl:
                'https://coreality-showroom-testing.s3.ap-east-1.amazonaws.com/storeFrontBackground8k.jpeg',
            sphereVideoUrl:
                'https://coreality-showroom-testing.s3.ap-east-1.amazonaws.com/360test8k.mp4',
            sphereVideoUrlLowRes:
                'https://coreality-showroom-testing.s3.ap-east-1.amazonaws.com/360test2k.mp4',
            defaultFov: 75,
            defaultCameraPosition: new THREE.Vector3(0.1, 0.05, 0.1),
            hotspots: [
                {
                    slug: 'trailer',
                    action: HotspotAction.Popup,
                    param: 'https://coreality-showroom-testing.s3.ap-east-1.amazonaws.com/360test2k.mp4',
                    vDegree: 90,
                    hDegree: 90,
                },
                {
                    slug: 'room1',
                    action: HotspotAction.Transition,
                    param: 'room1',
                    vDegree: -90,
                    hDegree: 0,
                },
                {
                    slug: 'door',
                    action: HotspotAction.Text,
                    param: 'Hello',
                    vDegree: 90,
                    hDegree: 0,
                },
            ],
            navBar: {
                projectName: 'Coreality Showroom',
                items: [
                    {
                        slug: 'Room 1',
                        transitionTarget: 'room1',
                    },
                    {
                        slug: 'Room 2',
                        transitionTarget: 'room2',
                    },
                    {
                        slug: 'Room 3',
                        transitionTarget: 'room3',
                    },
                ],
            },
            rooms: [
                {
                    slug: 'hat',
                    popupInfo: {
                        title: 'Hat',
                        description:
                            'Introducing the "Shadow Stetson" cowboy hat in dark brown, a stylish and rugged accessory. This hat is made with premium materials and features a classic cowboy hat design with a wide brim and a rounded crown. The dark brown color is both handsome and versatile, making this hat an ideal choice for a wide range of occasions. Whether working on the ranch, attending a country-themed event, or simply enjoying a sunny day outdoors, this must-have cowboy hat is both practical and fashionable.',
                        price: '$320.00',
                        link: 'https://preview.thisisgusto.com/',
                        cta: 'Purchase',
                    },
                    type: RoomType.Image,
                    url: '/hat_bg.png',
                },
                {
                    slug: 'bag',
                    popupInfo: {
                        title: 'Handbag',
                        description:
                            'Introducing the "Bella Basket" white handbag for women, a sophisticated and versatile accessory. This handbag is made with high-quality materials and features a classic white color that is both stylish and timeless. The basket-weave design adds a touch of texture and the spacious interior is perfect for carrying all of your essentials. Whether heading to the office, attending a formal event, or simply running errands, this must-have handbag is both functional and fashionable.',
                        price: '$2300.00',
                        link: 'https://preview.thisisgusto.com/',
                        cta: 'Purchase',
                    },
                    type: RoomType.Image,
                    url: '/hat_bg.png',
                },
                {
                    slug: 'oxford-shoe',
                    popupInfo: {
                        title: 'Oxford shoe',
                        description: `Step into style with Gusto's Men's Leather Shoes. Expertly crafted from premium leather, these shoes offer superior comfort and durability. With a sleek design, they are perfect for formal and casual occasions alike. Experience the perfect blend of elegance and functionality with Gusto's Men's Leather Shoes.`,
                        price: '$368.00',
                        link: 'https://preview.thisisgusto.com/',
                        cta: 'Purchase',
                    },
                    type: RoomType.Image,
                    url: '/hat_bg.png',
                },
                {
                    slug: 'red-shoe',
                    popupInfo: {
                        title: 'Red shoes',
                        description:
                            'Introducing the red luxury high heel shoes for women by Gusto, a renowned Italian factory. These sophisticated shoes boast a classic red color, a glossy leather finish, and a sturdy heel. The pointed toe and adjustable ankle strap provide a modern and practical design. Gusto has been crafting luxury footwear for over 50 years and these shoes are a testament to their attention to detail and use of premium materials. Perfect for special occasions or adding glamour to your everyday look. Make a statement with these must-have shoes.',
                        price: '$1100.00',
                        link: 'https://preview.thisisgusto.com/',
                        cta: 'Purchase',
                    },
                    type: RoomType.Image,
                    url: '/hat_bg.png',
                },
                {
                    slug: 'glasses',
                    popupInfo: {
                        title: 'Sunglasses',
                        description:
                            'Introducing the Gusto Sunglasses, a stylish accessory for any occasion. These high-quality sunglasses feature a sleek design with premium plastic frames and polarized lenses for reduced glare and improved clarity. The gradient tint adds a touch of glamour. The classic rectangular shape flatters a wide range of face shapes and the subtle branding on the side adds a touch of luxury. Whether hitting the beach, running errands, or just enjoying a sunny day, these must-have sunglasses offer both style and protection.',
                        price: '$800.00',
                        link: 'https://preview.thisisgusto.com/',
                        cta: 'Purchase',
                    },
                    type: RoomType.Image,
                    url: '/hat_bg.png',
                },
            ],
            audios: [
                {
                    name: 'music',
                    url: 'https://coreality-showroom-testing.s3.ap-east-1.amazonaws.com/music.mp3',
                    position: [0, 0, 10] as [number, number, number],
                    rotation: [0, (Math.PI * 7) / 8, 0] as [
                        number,
                        number,
                        number,
                    ],
                },
            ],
        },
    ],
    ...ConfigHelper,
};

export default Config;
