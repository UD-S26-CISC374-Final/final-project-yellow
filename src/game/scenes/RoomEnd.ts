import { EventBus } from "../event-bus";
import { Scene } from "phaser";

import PhaserLogo from "../objects/phaser-logo";
import { CommandWriter } from "../CommandWriter";
import { Pockets } from "../Pockets";
import { Hand } from "../Hand";
import { Location } from "../Location";
//import Text from "phaser3-rex-plugins/plugins/gameobjects/tagtext/textbase/Text";
//import FpsText from "../objects/fps-text";

export class RoomEnd extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    pockets!: Pockets;
    hand!: Hand;
    location!: Location;

    frameCounter!: number;
    //fpsText: FpsText;

    //keyEnter = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    constructor() {
        super("RoomEnd");
    }

    create() {
        this.sound.stopByKey("FireEffect");
        this.sound.play("FireEffect", { volume: 0.1 });

        this.frameCounter = 0;

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(400, 300, "Room12_1Key");
        if (this.registry.get("HasSkellyKey")) {
            this.background.setTexture("Room12_1NoMasks");
        } else if (this.registry.get("Mask1In")) {
            this.background.setTexture("Room12_1OneMasks");
        } else if (this.registry.get("Mask2In")) {
            this.background.setTexture("Room12_1TwoMasks");
        } else if (this.registry.get("Mask3In")) {
            this.background.setTexture("Room12_1ThreeMasks");
        } else if (this.registry.get("Mask4In")) {
            this.background.setTexture("Room12_1AllMasks");
        }
        this.background.setDisplaySize(this.scale.width + 5, this.scale.height);

        const KeyObject = this.add.text(220, 250, "SkellyKey", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#3898ff",
            padding: { x: 9, y: 9.5 },
        });
        KeyObject.setOrigin(0.15, 0);
        KeyObject.setActive(false).setVisible(false);

        const Hole = this.add.text(520, 250, "Hole", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        Hole.setOrigin(0.15, 0);
        Hole.setActive(false).setVisible(false);

        const maskAnswer = [
            "MaskPiece2",
            "MaskPiece4",
            "MaskPiece3",
            "MaskPiece1",
        ];

        let maskCurrent: string[] = [];

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
                    myText.text === "mask piece inserted" ||
                    myText.text === "mask pieces returned" ||
                    myText.text === "mask piece already inserted")
            ) {
                myText.text = "";
            }
            this.rexUI.edit(myText, {
                onClose: () => {
                    const input = myText.text;
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
                    } else if (myText.text === "end") {
                        this.scene.start("FinalScene");
                    }

                    CommandWriter.mvMaskPiece(
                        input,
                        this,
                        "Hole",
                        maskCurrent,
                        maskAnswer,
                        myText,
                    );

                    CommandWriter.mvCommandToPockets(
                        input,
                        this,
                        KeyObject.text,
                        KeyObject,
                        myText,
                        "HasSkellyKey",
                        "SkellyKeyInPocket",
                    );

                    // if (
                    //     myText.text === "ls" &&
                    //     !KeyObject.active &&
                    //     !this.registry.get("HasSkellyKey")
                    // ) {
                    //     KeyObject.setActive(true);
                    //     KeyObject.alpha = 1;
                    //     this.pockets.pocketsIndicator
                    //         .setActive(true)
                    //         .setVisible(true);
                    //     this.hand.handPrompt.setActive(true).setVisible(true);
                    //     myText.text = "Insert Command Here";
                    // } else if (
                    //     (myText.text === "ls" && KeyObject.active) ||
                    //     (myText.text === "ls" &&
                    //         this.registry.get("HasSkellyKey"))
                    // )
                    CommandWriter.lsCommand(
                        input,
                        myText,
                        [
                            Hole,
                            KeyObject,
                            this.pockets.pocketsIndicator,
                            this.hand.handPrompt,
                        ],
                        this.hand,
                        this,
                    );

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

                    if (
                        maskAnswer.every(
                            (value, index) => value === maskCurrent[index],
                        )
                    ) {
                        this.camera.fadeOut(1000, 0, 0, 0);

                        this.time.delayedCall(1000, () => {
                            this.scene.start("FinalScene");
                        });
                    } else if (maskCurrent.length == maskAnswer.length) {
                        maskCurrent = [];
                        myText.text = "mask pieces returned";
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

        this.location = new Location(this);
        this.location.create();

        EventBus.emit("current-scene-ready", this);
    }

    update(): void {
        this.frameCounter++;

        if (!this.registry.get("HasSkellyKey")) {
            if (this.frameCounter === 30) {
                const newBg =
                    this.background.texture.key === "Room12_1Key" ?
                        "Room12_2Key"
                    :   "Room12_1Key";

                this.background.setTexture(newBg);

                this.frameCounter = 0;
            }
        } else {
            if (this.frameCounter === 30) {
                if (
                    !this.registry.get("Mask1In") &&
                    !this.registry.get("Mask2In") &&
                    !this.registry.get("Mask3In") &&
                    !this.registry.get("Mask4In")
                ) {
                    const newBg =
                        this.background.texture.key === "Room12_1NoMasks" ?
                            "Room12_2NoMasks"
                        :   "Room12_1NoMasks";

                    this.background.setTexture(newBg);

                    this.frameCounter = 0;
                } else if (this.registry.get("Mask1In")) {
                    const newBg =
                        this.background.texture.key === "Room12_1OneMasks" ?
                            "Room12_2OneMasks"
                        :   "Room12_1OneMasks";

                    this.background.setTexture(newBg);

                    this.frameCounter = 0;
                } else if (this.registry.get("Mask2In")) {
                    const newBg =
                        this.background.texture.key === "Room12_2TwoMasks" ?
                            "Room12_2TwoMasks"
                        :   "Room12_2TwoMasks";

                    this.background.setTexture(newBg);

                    this.frameCounter = 0;
                } else if (this.registry.get("Mask3In")) {
                    const newBg =
                        this.background.texture.key === "Room12_1ThreeMasks" ?
                            "Room12_2ThreeMasks"
                        :   "Room12_1ThreeMasks";

                    this.background.setTexture(newBg);

                    this.frameCounter = 0;
                } else if (this.registry.get("Mask4In")) {
                    const newBg =
                        this.background.texture.key === "Room12_1AllMasks" ?
                            "Room12_2AllMasks"
                        :   "Room12_1AllMasks";

                    this.background.setTexture(newBg);

                    this.frameCounter = 0;
                }
            }
        }
    }
}
