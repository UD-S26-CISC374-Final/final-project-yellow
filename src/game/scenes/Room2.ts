import { CommandWriter } from "../CommandWriter";
import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import { Pockets } from "../Pockets";

//import PhaserLogo from "../objects/phaser-logo";

export class Room2 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    pockets!: Pockets;
    //phaserLogo: PhaserLogo;
    //fpsText: FpsText;

    //keyEnter = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    constructor() {
        super("Room2");
    }

    create() {
        //if (!this.input.keyboard) return;

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(400, 300, "room1");
        //this.background.setDisplaySize(this.scale.width, this.scale.height);

        const skelly = this.add.text(330, 200, "Door", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        skelly.setOrigin(0.15, 0);
        skelly.setActive(false);
        skelly.alpha = 0;

        const myText = this.add.text(330, 500, "Insert Command Here", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        myText.setOrigin(0.15, 0);

        this.input.keyboard!.on("keydown", (event: KeyboardEvent) => {
            if (
                event.key !== "Enter" &&
                (myText.text === "Insert Command Here" ||
                    myText.text === "Command Not Found" ||
                    myText.text === "Door Locked")
            ) {
                myText.text = "";
            }
            this.rexUI.edit(myText, {
                onClose: () => {
                    const input = myText.text;

                    CommandWriter.lsCommand(input, myText, [skelly]);

                    CommandWriter.cdCommandLocked(
                        input,
                        this,
                        myText,
                        skelly.text,
                        "GameOver",
                        "SkellyOpen",
                    );

                    CommandWriter.cdBack(input, this, myText, "Room1");

                    CommandWriter.openInventory(
                        input,
                        this.pockets,
                        myText,
                        this,
                    );

                    CommandWriter.closeInventory(
                        input,
                        this.pockets,
                        myText,
                        this,
                    );

                    CommandWriter.checkCommandFound(myText);

                    /*
                    if (
                        myText.text === "cd " + skelly.text &&
                        skelly.active &&
                        this.registry.get("SkellyOpen")
                    ) {
                        this.scene.start("GameOver");
                    } else if (
                        myText.text === "cd " + skelly.text &&
                        skelly.active &&
                        !this.registry.get("SkellyOpen")
                    ) {
                        myText.text = "Door Locked";
                    } else 
                        
                        *if (myText.text === "ls" && !skelly.active) {
                        skelly.setActive(true);
                        skelly.alpha = 1;
                        myText.text = "Insert Command Here";
                    } else if (myText.text === "ls" && skelly.active) {
                        myText.text = "Insert Command Here";
                    } else if (myText.text === "cd ..") {
                        this.scene.start("Level1");
                    } else if (
                        myText.text !== "cd .." &&
                        myText.text !== "cd " + skelly.text &&
                        myText.text !== "ls"
                    ) {
                        myText.text = "Command Not Found";
                    }
                        */
                },
            });
        });

        //this.phaserLogo = new PhaserLogo(this, this.cameras.main.width / 2, 0);
        //this.fpsText = new FpsText(this);

        this.pockets = new Pockets(this);
        this.pockets.create();

        EventBus.emit("current-scene-ready", this);
    }

    update() {
        //this.fpsText.update();
    }

    changeScene() {
        //this.scene.start("GameOver");
    }
}
