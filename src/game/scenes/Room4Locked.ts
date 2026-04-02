import { EventBus } from "../event-bus";
import { Scene } from "phaser";

import PhaserLogo from "../objects/phaser-logo";
//import Text from "phaser3-rex-plugins/plugins/gameobjects/tagtext/textbase/Text";
//import FpsText from "../objects/fps-text";

export class Room4Locked extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    //fpsText: FpsText;

    //keyEnter = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    constructor() {
        super("Room4Locked");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha(0.5);

        const cdRoom1 = this.add.text(70, 200, "Room1", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        cdRoom1.setOrigin(0.15, 0);
        cdRoom1.setActive(false);
        cdRoom1.alpha = 0;

        const cdRoom3 = this.add.text(590, 200, "Room3", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        cdRoom3.setOrigin(0.15, 0);
        cdRoom3.setActive(false);
        cdRoom3.alpha = 0;

        const myText = this.add.text(330, 500, "Insert Command Here", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        myText.setOrigin(0.15, 0);

        myText.setInteractive().on("pointerdown", () => {
            myText.text = "";
            this.rexUI.edit(myText, {
                onClose: () => {
                    if (
                        myText.text === "cd " + cdRoom1.text &&
                        cdRoom1.active
                    ) {
                        this.scene.start("Room1_1");
                    } else if (
                        myText.text === "cd " + cdRoom3.text &&
                        cdRoom3.active
                    ) {
                        this.scene.start("RoomStartRight");
                    } else if (myText.text === "ls" && !cdRoom1.active) {
                        //mySprite.setActive(true);
                        //mySprite.alpha = 1;

                        cdRoom1.setActive(true);
                        cdRoom3.setActive(true);
                        cdRoom1.alpha = 1;
                        cdRoom3.alpha = 1;
                        myText.text = "Insert Command Here";
                    } else if (myText.text === "ls" && cdRoom1.active) {
                        myText.text = "Insert Command Here";
                    } else if (
                        myText.text !== "cd .." &&
                        myText.text !== "cd " + cdRoom1.text &&
                        myText.text !== "ls"
                    ) {
                        myText.text = "Command Not Found";
                    }
                },
            });
        });

        //this.phaserLogo = new PhaserLogo(this, this.cameras.main.width / 2, 0);
        //this.fpsText = new FpsText(this);

        EventBus.emit("current-scene-ready", this);
    }

    update() {
        //this.fpsText.update();
    }

    changeScene() {
        //this.scene.start("GameOver");
    }
}
