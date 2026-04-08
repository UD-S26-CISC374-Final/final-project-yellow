import { Boot } from "./scenes/boot";
import { GameOver } from "./scenes/game-over";
import { Room2 } from "./scenes/Room2";
import { Room3 } from "./scenes/Room3";
import { Room4Locked } from "./scenes/Room4Locked";
import { Room5 } from "./scenes/Room5";
import { Room6 } from "./scenes/Room6";
import { Room7 } from "./scenes/Room7";
import { Room8 } from "./scenes/Room8";
import { Room9 } from "./scenes/Room9";
import { Room10 } from "./scenes/Room10";
import { Room11 } from "./scenes/Room11";
import { Room12 } from "./scenes/Room12";
import { RoomEnd } from "./scenes/RoomEnd";
import { Room1 as MainGame } from "./scenes/Room1";
import { Tutorial } from "./scenes/Tutorial";
import { MainMenu } from "./scenes/main-menu";
import { AUTO, Game } from "phaser";
import { Preloader } from "./scenes/preloader";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
    title: "My Untitled CISC374 Game",
    version: "0.0.1",
    type: AUTO,
    //parent: "game-container",
    dom: {
        createContainer: true,
    },
    backgroundColor: "#66ff00",
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Tutorial,
        MainGame,
        Room2,
        Room3,
        Room4Locked,
        Room5,
        Room6,
        Room7,
        Room8,
        Room9,
        Room10,
        Room11,
        Room12,
        RoomEnd,
        GameOver,
    ],
    plugins: {
        scene: [
            {
                key: "rexUI",
                plugin: RexUIPlugin,
                mapping: "rexUI",
            },
        ],
    },

    scale: {
        parent: "phaser-game",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: { x: 0, y: 300 },
        },
    },

    input: {
        keyboard: true,
        mouse: true,
        touch: true,
        gamepad: false,
    },
    render: {
        pixelArt: false,
        antialias: true,
    },
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
};

export default StartGame;
