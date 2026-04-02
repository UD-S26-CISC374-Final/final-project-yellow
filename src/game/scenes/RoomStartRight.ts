import { EventBus } from "../event-bus";
import { Scene } from "phaser";

//import PhaserLogo from "../objects/phaser-logo";

export class RoomStartRight extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    //phaserLogo: PhaserLogo;
    //fpsText: FpsText;

    //keyEnter = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    constructor() {
        super("RoomStartRight");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(400, 300, "room3");

        const KeyObject = this.add.text(330, 200, "Key", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        KeyObject.setOrigin(0.15, 0);
        KeyObject.setActive(false);
        KeyObject.alpha = 0;

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
                        myText.text === "ls" &&
                        !KeyObject.active &&
                        !this.registry.get("HasKey1")
                    ) {
                        KeyObject.setActive(true);
                        KeyObject.alpha = 1;
                        myText.text = "Insert Command Here";
                    } else if (
                        (myText.text === "ls" && KeyObject.active) ||
                        (myText.text === "ls" && this.registry.get("HasKey1"))
                    ) {
                        myText.text = "Insert Command Here";
                    } else if (myText.text === "cd ..") {
                        this.scene.start("Level1");
                    } else if (
                        myText.text !== "cd .." &&
                        myText.text !== "cd " + KeyObject.text &&
                        myText.text !== "ls" &&
                        myText.text !== "mov " + KeyObject.text + " pockets"
                    ) {
                        myText.text = "Command Not Found";
                    } else if (
                        myText.text ===
                        "mov " + KeyObject.text + " pockets"
                    ) {
                        KeyObject.setActive(false);
                        KeyObject.alpha = 0;
                        this.registry.set("HasKey1", true);
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
