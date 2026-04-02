import { EventBus } from "../event-bus";
import { Scene } from "phaser";

//import PhaserLogo from "../objects/phaser-logo";

export class Room1_1 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    //phaserLogo: PhaserLogo;
    //fpsText: FpsText;

    //keyEnter = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    constructor() {
        super("Room1_1");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(400, 300, "background");
        this.background.setAlpha(0.5);

        const cdRoom1_1 = this.add.text(330, 200, "Door", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        cdRoom1_1.setOrigin(0.15, 0);
        cdRoom1_1.setActive(false);
        cdRoom1_1.alpha = 0;

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
                        myText.text === "cd " + cdRoom1_1.text &&
                        cdRoom1_1.active &&
                        this.registry.get("SkellyOpen")
                    ) {
                        this.scene.start("GameOver");
                    } else if (
                        myText.text === "cd " + cdRoom1_1.text &&
                        cdRoom1_1.active &&
                        !this.registry.get("SkellyOpen")
                    ) {
                        myText.text = "Door Locked";
                    } else if (myText.text === "ls" && !cdRoom1_1.active) {
                        cdRoom1_1.setActive(true);
                        cdRoom1_1.alpha = 1;
                        myText.text = "Insert Command Here";
                    } else if (myText.text === "ls" && cdRoom1_1.active) {
                        myText.text = "Insert Command Here";
                    } else if (myText.text === "cd ..") {
                        this.scene.start("Level1");
                    } else if (
                        myText.text !== "cd .." &&
                        myText.text !== "cd " + cdRoom1_1.text &&
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
