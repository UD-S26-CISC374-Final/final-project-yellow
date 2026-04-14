import { EventBus } from "../event-bus";
import { Scene } from "phaser";

import PhaserLogo from "../objects/phaser-logo";
import { CommandWriter } from "../CommandWriter";
import { Pockets } from "../Pockets";
import { Hand } from "../Hand";
//import Text from "phaser3-rex-plugins/plugins/gameobjects/tagtext/textbase/Text";
//import FpsText from "../objects/fps-text";

export class Room12 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    pockets!: Pockets;
    hand!: Hand;
    //fpsText: FpsText;

    //keyEnter = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    constructor() {
        super("Room12");
    }

    create() {
        //if (!this.input.keyboard) return;

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(400, 300, "OnlyDoorLeft");

        const cdRoomEnd = this.add.text(70, 200, "RoomEnd", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        cdRoomEnd.setOrigin(0.15, 0);
        cdRoomEnd.setActive(false);
        cdRoomEnd.alpha = 0;

        const myText = this.add.text(330, 500, "Insert Command Here", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        myText.setOrigin(0.15, 0);

        const maskText = this.add.text(
            400,
            150,
            "A mask used to be used to escape this place, but has since shattered into pieces.",
            {
                wordWrap: { width: 200 },
                backgroundColor: "#000000",
            },
        );
        maskText.setOrigin(0.15, 0);

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

                    CommandWriter.lsCommand(
                        input,
                        myText,
                        [cdRoomEnd],
                        this.hand,
                        this,
                    );

                    CommandWriter.cdCommand(
                        input,
                        this,
                        myText,
                        cdRoomEnd.text,
                        "RoomEnd",
                    );

                    CommandWriter.cdBack(input, this, myText, "Room11");

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

                    /*
                    if (
                        myText.text === "cd " + cdRoom5.text &&
                        cdRoom5.active
                    ) {
                        this.scene.start("Room1_1");
                    } else if (
                        myText.text === "cd " + cdRoom6.text &&
                        cdRoom6.active
                    ) {
                        this.scene.start("RoomStartRight");
                    } else if (myText.text === "cd ..") {
                        this.scene.start("Level1");
                    } else if (myText.text === "ls" && !cdRoom5.active) {
                        //mySprite.setActive(true);
                        //mySprite.alpha = 1;

                        cdRoom5.setActive(true);
                        cdRoom6.setActive(true);
                        cdRoom5.alpha = 1;
                        cdRoom6.alpha = 1;
                        myText.text = "Insert Command Here";
                    } else if (myText.text === "ls" && cdRoom5.active) {
                        myText.text = "Insert Command Here";
                    } else if (
                        myText.text !== "cd .." &&
                        myText.text !== "cd " + cdRoom5.text &&
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
