import { EventBus } from "../event-bus";
import { AUTO, GameObjects, Scene } from "phaser";
import { Hand } from "../Hand";
import { Notes } from "../Notes";

import PhaserLogo from "../objects/phaser-logo";
import { CommandWriter } from "../CommandWriter";
import { Pockets } from "../Pockets";
import { Location } from "../Location";
//import Text from "phaser3-rex-plugins/plugins/gameobjects/tagtext/textbase/Text";
//import FpsText from "../objects/fps-text";

export class Room10 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    pockets!: Pockets;
    hand!: Hand;
    notes!: Notes;
    location!: Location;

    randCode!: string;

    frameCounter!: number;

    mask4!: GameObjects.Text;

    textCode!: GameObjects.Text;

    //keyEnter = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    constructor() {
        super("Room10");
    }

    create() {
        this.registry.set("Mask4InView", false);

        this.frameCounter = 0;
        //if (!this.input.keyboard) return;

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(400, 300, "Room10_1NoMask");
        this.background.setDisplaySize(this.scale.width + 5, this.scale.height);

        this.randCode = this.registry.get("code") as string;

        this.mask4 = this.add.text(400, 100, "MaskPiece4", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        this.mask4.setOrigin(0.15, 0);
        this.mask4.setActive(false).setVisible(false);

        //this.randCode

        const secretCode = this.add.text(
            405,
            305,
            "Day ???: I don't know how much time I have left here. My mind is starting to go crazy. If anyone finds this note, the code for the safe, the one at the start, is " +
                this.randCode +
                ".",
            {
                fixedWidth: 320,
                //fixedHeight: 36,
                fontFamily: "Architext",
                backgroundColor: "#00000000",
                color: "#000000",
                fontSize: 30,
                padding: { x: 9, y: 9.5 },
                lineSpacing: 12,
                wordWrap: { width: 310 },
            },
        );
        secretCode.setOrigin(0.5, 0.5);
        secretCode.setActive(false).setVisible(false);
        secretCode.setDepth(1);

        const code = this.add.text(100, 200, "WeirdNote", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        code.setOrigin(0.15, 0);
        code.setActive(false).setVisible(false);

        this.textCode = this.add.text(
            375,
            550,
            this.registry.get("code") as string,
            {
                fixedWidth: AUTO,
                fixedHeight: 36,
                backgroundColor: "#000000",
                padding: { x: 9, y: 9.5 },
            },
        );
        this.textCode.setOrigin(0.15, 0);
        this.textCode.setActive(false).setVisible(false);

        const myText = this.add.text(330, 500, "Insert Command Here", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        myText.setOrigin(0.15, 0);
        myText.setDepth(0);

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
                        [
                            code,
                            this.pockets.pocketsIndicator,
                            this.hand.handPrompt,
                        ],
                        this.hand,
                        this,
                    );
                    CommandWriter.lsACommand(
                        input,
                        myText,
                        [
                            code,
                            this.mask4,
                            this.pockets.pocketsIndicator,
                            this.hand.handPrompt,
                        ],
                        this.hand,
                        this,
                    );

                    CommandWriter.mvCommandToPockets(
                        input,
                        this,
                        this.mask4.text,
                        this.mask4,
                        myText,
                        "HasMaskPiece4",
                        "MaskPiece4InPocket",
                    );

                    CommandWriter.cdBack(input, this, myText, "Room9");

                    CommandWriter.cdCommandNote(
                        input,
                        this,
                        this.notes,
                        myText,
                        secretCode,
                        code.text,
                    );

                    CommandWriter.mvCommandItemToHand(
                        input,
                        this.hand,
                        this.pockets,
                        this,
                        this.registry.get("ItemsNames") as string[],
                        myText,
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

        this.notes = new Notes(this);
        this.notes.create();

        this.location = new Location(this);
        this.location.create();

        EventBus.emit("current-scene-ready", this);
    }

    update(): void {
        this.frameCounter++;

        if (this.registry.get("hasCode")) {
            this.textCode.setActive(true).setVisible(true);
        }

        if (this.registry.get("HasMaskPiece4")) {
            this.mask4.setActive(false).setVisible(false);
        }

        if (
            !this.registry.get("Mask4InView") ||
            this.registry.get("HasMaskPiece4")
        ) {
            if (this.frameCounter === 30) {
                const newBg =
                    this.background.texture.key === "Room10_1NoMask" ?
                        "Room10_2NoMask"
                    :   "Room10_1NoMask";

                this.background.setTexture(newBg);

                this.frameCounter = 0;
            }
        } else {
            if (this.frameCounter === 30) {
                const newBg =
                    this.background.texture.key === "Room10_1Mask" ?
                        "Room10_2Mask"
                    :   "Room10_1Mask";

                this.background.setTexture(newBg);

                this.frameCounter = 0;
            }
        }
    }

    changeScene() {
        //this.scene.start("GameOver");
    }
}
