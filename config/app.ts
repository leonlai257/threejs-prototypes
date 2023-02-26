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
    url?: string;
    type?: RoomType;
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
                'https://coreality-showroom-testing.s3.ap-east-1.amazonaws.com/sampleFallBack.png',
            sphereVideoUrl:
                'https://coreality-showroom-testing.s3.ap-east-1.amazonaws.com/360test8k.mp4',
            sphereVideoUrlLowRes:
                'https://coreality-showroom-testing.s3.ap-east-1.amazonaws.com/360test2k.mp4',
            defaultFov: 75,
            defaultCameraPosition: new THREE.Vector3(-0.1, 0, 0),
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
                    slug: 'room1',
                    type: RoomType.Image,
                    url: 'https://coreality-showroom-testing.s3.ap-east-1.amazonaws.com/wof-trailer-thumbnail.jpeg',
                },
                {
                    slug: 'room2',
                    type: RoomType.Video,
                    url: 'https://coreality-showroom-testing.s3.ap-east-1.amazonaws.com/sampleRoom.mp4',
                },
                {
                    slug: 'room3',
                    type: RoomType.Video,
                    url: 'https://coreality-showroom-testing.s3.ap-east-1.amazonaws.com/360test2k.mp4',
                },
            ],
            audios: [
                {
                    name: 'music',
                    url: '/music.mp3',
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
