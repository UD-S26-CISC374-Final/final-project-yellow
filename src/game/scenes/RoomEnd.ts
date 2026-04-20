import { EventBus } from "../event-bus";
import { Scene } from "phaser";

import PhaserLogo from "../objects/phaser-logo";
import { CommandWriter } from "../CommandWriter";
import { Pockets } from "../Pockets";
import { Hand } from "../Hand";
//import Text from "phaser3-rex-plugins/plugins/gameobjects/tagtext/textbase/Text";
//import FpsText from "../objects/fps-text";

export class RoomEnd extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    pockets!: Pockets;
    hand!: Hand;
    //fpsText: FpsText;

    //keyEnter = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    constructor() {
        super("RoomEnd");
    }

    create() {
        //if (!this.input.keyboard) return;

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(400, 300, "RoomEnd");

        const KeyObject = this.add.text(620, 400, "SkellyKey", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#3898ff",
            padding: { x: 9, y: 9.5 },
        });
        KeyObject.setOrigin(0.15, 0);
        KeyObject.setActive(false);
        KeyObject.alpha = 0;

        const maskAnswer = ["mask1", "mask2", "mask3", "mask4"];

        let maskCurrent = ["", "", "", ""];

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
                    myText.text === "Door Locked" ||
                    myText.text === "mask piece inserted")
            ) {
                myText.text = "";
            }
            this.rexUI.edit(myText, {
                onClose: () => {
                    if (myText.text === "mv mask1 maskhole") {
                        for (let i = 0; i < maskAnswer.length; i++) {
                            if (maskCurrent[i] === "") {
                                maskCurrent[i] = "mask1";
                                myText.text = "mask piece inserted";
                                break;
                            }
                        }
                    }
                    if (myText.text === "mv mask2 maskhole") {
                        for (let i = 0; i < maskAnswer.length; i++) {
                            if (maskCurrent[i] === "") {
                                maskCurrent[i] = "mask2";
                                myText.text = "mask piece inserted";
                                break;
                            }
                        }
                    }
                    if (myText.text === "mv mask3 maskhole") {
                        for (let i = 0; i < maskAnswer.length; i++) {
                            if (maskCurrent[i] === "") {
                                maskCurrent[i] = "mask3";
                                myText.text = "mask piece inserted";
                                break;
                            }
                        }
                    }
                    if (myText.text === "mv mask4 maskhole") {
                        for (let i = 0; i < maskAnswer.length; i++) {
                            if (maskCurrent[i] === "") {
                                maskCurrent[i] = "mask4";
                                myText.text = "mask piece inserted";
                                break;
                            }
                        }
                    }

                    const input = myText.text;

                    CommandWriter.mvCommandToPockets(
                        input,
                        this,
                        KeyObject.text,
                        KeyObject,
                        myText,
                        "HasSkellyKey",
                        "SkellyKeyInPocket",
                    );

                    if (
                        myText.text === "ls" &&
                        !KeyObject.active &&
                        !this.registry.get("HasSkellyKey")
                    ) {
                        KeyObject.setActive(true);
                        KeyObject.alpha = 1;
                        myText.text = "Insert Command Here";
                    } else if (
                        (myText.text === "ls" && KeyObject.active) ||
                        (myText.text === "ls" &&
                            this.registry.get("HasSkellyKey"))
                    ) {
                        myText.text = "Insert Command Here";
                    }

                    CommandWriter.cdBack(input, this, myText, "Room12");

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

                    CommandWriter.mvCommandItemToHand(
                        input,
                        this.hand,
                        this.pockets,
                        this,
                        this.registry.get("ItemsNames") as string[],
                        myText,
                    );

                    CommandWriter.checkCommandFound(myText);

                    if (maskCurrent[3] != "") {
                        if (
                            maskCurrent.every(
                                (value, index) => value === maskAnswer[index],
                            )
                        ) {
                            this.scene.start("GameEnd");
                        } else {
                            maskCurrent = ["", "", "", ""];
                        }
                    }
                },
            });
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
