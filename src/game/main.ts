import { Boot } from "./scenes/boot";
import { GameOver } from "./scenes/game-over";
import { Room2 } from "./scenes/Room2";
import { RoomStartRight } from "./scenes/RoomStartRight";
import { Room4Locked } from "./scenes/Room4Locked";
import { Level1 as MainGame } from "./scenes/level1";
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
    backgroundColor: "#ff0000",
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        Room2,
        RoomStartRight,
        Room4Locked,
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
