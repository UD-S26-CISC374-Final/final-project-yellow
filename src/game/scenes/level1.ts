import { EventBus } from "../event-bus";
import { Scene } from "phaser";

import PhaserLogo from "../objects/phaser-logo";
//import FpsText from "../objects/fps-text";

export class Level1 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    //fpsText: FpsText;

    constructor() {
        super("Level1");
    }

    create() {        
        const text = this.add.text(400, 300, 'Hello World', { fixedWidth: 600, fixedHeight: 36 })
            text.setOrigin(0.5, 0.5)

            text.setInteractive().on('pointerdown', () => {
                this.rexUI.edit(text)
        })


        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha(0.5);

        //this.phaserLogo = new PhaserLogo(this, this.cameras.main.width / 2, 0);
        //this.fpsText = new FpsText(this);

        EventBus.emit("current-scene-ready", this);
    }

    update() {
        //this.fpsText.update();
    }

    changeScene() {
        this.scene.start("GameOver");
    }
}
