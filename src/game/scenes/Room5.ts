import { EventBus } from "../event-bus";
import { AUTO, GameObjects, Scene } from "phaser";

import PhaserLogo from "../objects/phaser-logo";
import { CommandWriter } from "../CommandWriter";
import { Pockets } from "../Pockets";
import { Hand } from "../Hand";
import { Location } from "../Location";
import { Notes } from "../Notes";
//import Text from "phaser3-rex-plugins/plugins/gameobjects/tagtext/textbase/Text";
//import FpsText from "../objects/fps-text";

export class Room5 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    pockets!: Pockets;
    hand!: Hand;
    location!: Location;
    notes!: Notes;

    mask1!: GameObjects.Text;
    //fpsText: FpsText;

    //keyEnter = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    constructor() {
        super("Room5");
    }

    create() {
        this.registry.set("Mask1InView", false);

        //if (!this.input.keyboard) return;

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(400, 300, "Room5NoMask");
        this.background.setDisplaySize(this.scale.width + 5, this.scale.height);

        const noteMessage = this.add.text(
            405,
            305,
            "Day 21: I am still roaming these endless halls, with the hope of finding the exit some day. I saw a mask just before the final door. I don't know if I'm going crazy, but I think I heard it talk.",
            {
                fixedWidth: 320,
                //fixedHeight: 36,
                backgroundColor: "#00000000",
                color: "#000000",
                fontFamily: "Architext",
                fontSize: 30,
                padding: { x: 9, y: 9.5 },
                lineSpacing: 12,
                wordWrap: { width: 310 },
            },
        );
        noteMessage.setOrigin(0.5, 0.5);
        noteMessage.setActive(false).setVisible(false);
        noteMessage.setDepth(1);

        const note = this.add.text(145, 400, "Note", {
            fixedWidth: AUTO,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        note.setOrigin(0.15, 0);
        note.setActive(false).setVisible(false);

        this.mask1 = this.add.text(490, 290, "MaskPiece1", {
            fixedWidth: AUTO,
            fixedHeight: 36,
            backgroundColor: "#3898ff",
            padding: { x: 9, y: 9.5 },
        });
        this.mask1.setOrigin(0.15, 0);

        this.mask1.setActive(false).setVisible(false);

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

                    CommandWriter.cdBack(input, this, myText, "Room4Locked");

                    CommandWriter.mvCommandToPockets(
                        input,
                        this,
                        this.mask1.text,
                        this.mask1,
                        myText,
                        "HasMaskPiece1",
                        "MaskPiece1InPocket",
                    );

                    CommandWriter.lsCommand(
                        input,
                        myText,
                        [
                            this.pockets.pocketsIndicator,
                            this.hand.handPrompt,
                            note,
                        ],
                        this.hand,
                        this,
                    );

                    CommandWriter.lsACommand(
                        input,
                        myText,
                        [
                            this.mask1,
                            this.pockets.pocketsIndicator,
                            this.hand.handPrompt,
                            note,
                        ],
                        this.hand,
                        this,
                    );

                    CommandWriter.cdCommandNote(
                        input,
                        this,
                        this.notes,
                        myText,
                        noteMessage,
                        note.text,
                    );

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
                },
            });
        });

        //this.phaserLogo = new PhaserLogo(this, this.cameras.main.width / 2, 0);
        //this.fpsText = new FpsText(this);

        this.pockets = new Pockets(this);
        this.pockets.create();

        this.hand = new Hand(this);
        this.hand.create();

        this.location = new Location(this);
        this.location.create();

        this.notes = new Notes(this);
        this.notes.create();

        EventBus.emit("current-scene-ready", this);
    }

    update(): void {
        if (
            !this.registry.get("Mask1InView") ||
            this.registry.get("HasMaskPiece1")
        ) {
            this.background.setTexture("Room5NoMask");
            this.mask1.setActive(false).setVisible(false);
        } else {
            this.background.setTexture("Room5Mask");
        }
    }

    changeScene() {
        //this.scene.start("GameOver");
    }
}
