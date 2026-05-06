import { EventBus } from "../event-bus";
import { GameObjects, Scene } from "phaser";

import PhaserLogo from "../objects/phaser-logo";
import { CommandWriter } from "../CommandWriter";
import { Pockets } from "../Pockets";
import { Hand } from "../Hand";
import { Location } from "../Location";
import { Notes } from "../Notes";
//import Text from "phaser3-rex-plugins/plugins/gameobjects/tagtext/textbase/Text";
//import FpsText from "../objects/fps-text";

export class Room7 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    pockets!: Pockets;
    hand!: Hand;
    location!: Location;
    notes!: Notes;

    frameCounter!: number;

    mask2!: GameObjects.Text;
    //fpsText: FpsText;

    //keyEnter = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    constructor() {
        super("Room7");
    }

    create() {
        //if (!this.input.keyboard) return;

        this.registry.set("Mask2InView", false);

        this.frameCounter = 0;

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(400, 300, "Room7_1NoMask");
        this.background.setDisplaySize(this.scale.width + 5, this.scale.height);

        const noteMessage = this.add.text(
            405,
            305,
            "Day 15: This place feels like a maze. I don't know where to go anymore. The skeleton told me there are hidden things in some rooms, even in this one. But I can't see it. Where is it? What is it? W̸h̴a̶t̴ is it? W̴h̷a̴t̶ ̸i̷s̵ ̶i̶t̶?",
            {
                fixedWidth: 320,
                //fixedHeight: 36,
                backgroundColor: "#00000000",
                color: "#000000",
                fontFamily: "Architext",
                fontSize: 27,
                padding: { x: 9, y: 9.5 },
                lineSpacing: 12,
                wordWrap: { width: 310 },
            },
        );
        noteMessage.setOrigin(0.5, 0.5);
        noteMessage.setActive(false).setVisible(false);
        noteMessage.setDepth(1);

        const note = this.add.text(100, 200, "TornNote", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        note.setOrigin(0.15, 0);
        note.setActive(false).setVisible(false);

        this.mask2 = this.add.text(400, 100, "MaskPiece2", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        this.mask2.setOrigin(0.15, 0);
        this.mask2.setActive(false).setVisible(false);
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

                    CommandWriter.cdBack(input, this, myText, "Room6");

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
                            this.mask2,
                            this.pockets.pocketsIndicator,
                            this.hand.handPrompt,
                            note,
                        ],
                        this.hand,
                        this,
                    );

                    CommandWriter.mvCommandToPockets(
                        input,
                        this,
                        this.mask2.text,
                        this.mask2,
                        myText,
                        "HasMaskPiece2",
                        "MaskPiece2InPocket",
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
        this.frameCounter++;

        if (this.registry.get("HasMaskPiece2")) {
            this.mask2.setActive(false).setVisible(false);
        }

        if (
            !this.registry.get("Mask2InView") ||
            this.registry.get("HasMaskPiece2")
        ) {
            if (this.frameCounter === 30) {
                const newBg =
                    this.background.texture.key === "Room7_1NoMask" ?
                        "Room7_2NoMask"
                    :   "Room7_1NoMask";

                this.background.setTexture(newBg);

                this.frameCounter = 0;

                this.mask2.setActive(false).setVisible(false);
            }
        } else {
            if (this.frameCounter === 30) {
                const newBg =
                    this.background.texture.key === "Room7_1Mask" ?
                        "Room7_2Mask"
                    :   "Room7_1Mask";

                this.background.setTexture(newBg);

                this.frameCounter = 0;
            }
        }
    }
}
