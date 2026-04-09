import { CommandWriter } from "../CommandWriter";
import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import { Pockets } from "../Pockets";
import { Hand } from "../Hand";

//import PhaserLogo from "../objects/phaser-logo";

export class Skelly extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    pockets!: Pockets;
    hand!: Hand;

    dialogueTexts!: string[];
    //phaserLogo: PhaserLogo;
    //fpsText: FpsText;

    //keyEnter = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    constructor() {
        super("Skelly");
    }

    create() {
        //if (!this.input.keyboard) return;

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(400, 300, "room3");

        this.dialogueTexts = [
            "",
            "You are not supposed to be here yet",
            "2",
            "3",
            "4",
        ];

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

        const cdSkelly = this.add.text(70, 200, "Skelly", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        cdSkelly.setOrigin(0.15, 0);
        cdSkelly.setActive(false);
        cdSkelly.alpha = 0;

        const skellyText = this.add.text(150, 300, "Hey!", {
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
            wordWrap: { width: 200 },
        });
        skellyText.setOrigin(0.15, 0);
        skellyText.setActive(false);
        skellyText.alpha = 0;
        let skellyTextIndex = 0;

        const updateSkellyText = () => {
            if (skellyTextIndex >= 1) {
                skellyText.text = this.dialogueTexts[skellyTextIndex];
            }

            /*
            if (skellyTextIndex === 1) {
                skellyText.text = "You shouldn't be here yet...";
            } else if (skellyTextIndex === 2) {
                skellyText.text = "2";
            } else if (skellyTextIndex === 3) {
                skellyText.text = "3";
            } else if (skellyTextIndex === 4) {
                skellyText.text = "4";
            }
                */

            skellyTextIndex++;
            if (skellyTextIndex > 5) {
                skellyText.setActive(false);
                skellyText.alpha = 0;
                //skellyTextIndex = 0;
                skellyText.text = "Go on";
            }
        };

        this.input.keyboard!.on("keydown", (event: KeyboardEvent) => {
            if (
                event.key !== "Enter" &&
                (myText.text === "Insert Command Here" ||
                    myText.text === "Command Not Found" ||
                    myText.text === "Door Locked")
            ) {
                myText.text = "";
            }
            if (!skellyText.active) {
                this.rexUI.edit(myText, {
                    onClose: () => {
                        const input = myText.text;

                        CommandWriter.lsCommand(input, myText, [cdSkelly]);

                        CommandWriter.mvCommandItemToHand(
                            input,
                            this.hand,
                            this.pockets,
                            this,
                            this.registry.get("ItemsNames") as string[],
                            myText,
                        );

                        if (myText.text === "cd Skelly") {
                            skellyText.setActive(true);
                            skellyText.alpha = 1;
                        }

                        CommandWriter.cdBack(input, this, myText, "Room2");

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
                    },
                });
            } else {
                if (event.key === "Enter") {
                    updateSkellyText();
                }
            }
        });

        //this.phaserLogo = new PhaserLogo(this, this.cameras.main.width / 2, 0);
        //this.fpsText = new FpsText(this);

        this.pockets = new Pockets(this);
        this.pockets.create();

        this.hand = new Hand(this);
        this.hand.create();

        EventBus.emit("current-scene-ready", this);
    }

    update() {
        //this.fpsText.update();
    }

    changeScene() {
        //this.scene.start("GameOver");
    }
}
