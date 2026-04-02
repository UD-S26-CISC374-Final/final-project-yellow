import { EventBus } from "../event-bus";
import { Scene } from "phaser";

//import PhaserLogo from "../objects/phaser-logo";
//import FpsText from "../objects/fps-text";

export class Level1 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    //phaserLogo: PhaserLogo;
    //fpsText: FpsText;

    constructor() {
        super("Level1");
    }

    create() {
        this.camera = this.cameras.main;
        //this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, "room1");
        //this.background.setAlpha(1);

        // this.phaserLogo = new PhaserLogo(this, this.cameras.main.width / 2, 0);
        // this.fpsText = new FpsText(this);

        EventBus.emit("current-scene-ready", this);
    }

    // update() {
    //     this.fpsText.update();
    // }

    changeScene(x) {
        if (x == 1) {
            this.scene.start("MainMenu");
        }
        this.scene.start("GameOver");
    }
}
