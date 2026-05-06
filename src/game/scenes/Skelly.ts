import { CommandWriter } from "../CommandWriter";
import { EventBus } from "../event-bus";
import { AUTO, GameObjects, Scene } from "phaser";
import { Pockets } from "../Pockets";
import { Hand } from "../Hand";
import { Location } from "../Location";
import { DialogComponent } from "../DialogComponent";

//import PhaserLogo from "../objects/phaser-logo";

export class Skelly extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    backgroundAfterMask: Phaser.GameObjects.Image;
    pockets!: Pockets;
    hand!: Hand;
    location!: Location;

    skellyText!: boolean;
    //dialogueTexts!: string[];

    dialogue!: DialogComponent;
    frameCounter!: number;

    mask3!: GameObjects.Text;

    constructor() {
        super("Skelly");
    }

    create() {
        this.registry.set("Mask3InView", false);

        this.frameCounter = 0;

        this.skellyText = false;

        this.dialogue = new DialogComponent(this);

        this.dialogue.xPos = 350;
        this.dialogue.yPos = 300;

        this.dialogue.characterIsTalking = this.skellyText;

        this.dialogue.soundToPlay = "Sans";

        this.dialogue.changeScene = false;

        this.dialogue.starterDialog = "Another victim of the dungeon.";

        this.dialogue.dialogueLines = [
            "Another victim of the dungeon.",
            "You were also trapped here without knowledge on who put you here?",
            "That is exactly my story as well.",
            "But listen to me.",
            "I refuse to see another soul succumb to my fate.",
            "On my time here, before my inevitable death...",
            "I have found this paper.",
            "It is said to uncover the hidden artifacts around this dungeon.",
            "It'll allow you to go in search of that that opens the final door.",
            "Just use 'ls -a' to reveal the secrets of this place.",
            "Give it a try here, and then continue with your quest.",
            "Good luck traveller.",
            "May God help you avoid my fate.",
        ];

        this.dialogue.dialogueAfterTalked = [
            "",
            "Remember to use 'ls -a' to search for hidden mysteries.",
            "It might be your only way out of this place.",
        ];

        this.dialogue.changeScene = false;

        this.dialogue.hasTalked = "SkellyTalked";

        this.dialogue.ImageTalk1 = this.add
            .image(450, 300, "SkellyTalk1")
            .setDepth(10);
        this.dialogue.ImageTalk1.setScale(0.4, 0.4);
        this.dialogue.ImageTalk1.setActive(false).setVisible(false);

        this.dialogue.ImageTalk2 = this.add
            .image(450, 300, "SkellyTalk2")
            .setDepth(10);
        this.dialogue.ImageTalk2.setScale(0.4, 0.4);
        this.dialogue.ImageTalk2.setActive(false).setVisible(false);

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(400, 300, "Skelly1_1NoMask");
        this.background.setDisplaySize(this.scale.width + 5, this.scale.height);

        this.mask3 = this.add.text(260, 300, "MaskPiece3", {
            fixedWidth: AUTO,
            fixedHeight: 36,
            backgroundColor: "#3898ff",
            padding: { x: 9, y: 9.5 },
        });
        this.mask3.setOrigin(0.15, 0);
        this.mask3.setActive(false).setVisible(false);

        this.backgroundAfterMask = this.add.image(400, 300, "Skelly2_1Mask");
        this.backgroundAfterMask.setDisplaySize(
            this.scale.width + 5,
            this.scale.height,
        );
        this.backgroundAfterMask.setActive(false).setVisible(false);

        const myText = this.add.text(330, 500, "Insert Command Here", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        myText.setOrigin(0.15, 0);

        const cdSkelly = this.add.text(382, 320, "Skelly", {
            fixedWidth: AUTO,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        cdSkelly.setOrigin(0.15, 0);
        cdSkelly.setActive(false).setVisible(false);

        this.input.keyboard!.on(
            "keydown",
            (event: KeyboardEvent) => {
                if (
                    event.key !== "Enter" &&
                    (myText.text === "Insert Command Here" ||
                        myText.text === "Command Not Found" ||
                        myText.text === "Door Locked")
                ) {
                    myText.text = "";
                }
                if (this.skellyText) {
                    this.dialogue.onComplete = () => {
                        this.skellyText = false;

                        myText.text = "Insert Command Here";

                        //skellyTalk.setActive(false).setVisible(false);

                        this.registry.set("lsACommandActive", true);

                        this.rexUI.edit(myText);
                    };
                    return;
                }
                this.rexUI.edit(myText, {
                    onClose: () => {
                        const input = myText.text;

                        CommandWriter.lsCommand(
                            input,
                            myText,
                            [
                                cdSkelly,
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
                                cdSkelly,
                                this.mask3,
                                this.pockets.pocketsIndicator,
                                this.hand.handPrompt,
                            ],
                            this.hand,
                            this,
                        );

                        CommandWriter.mvCommandToPockets(
                            input,
                            this,
                            this.mask3.text,
                            this.mask3,
                            myText,
                            "HasMaskPiece3",
                            "MaskPiece3InPocket",
                        );

                        CommandWriter.mvCommandItemToHand(
                            input,
                            this.hand,
                            this.pockets,
                            this,
                            this.registry.get("ItemsNames") as string[],
                            myText,
                        );

                        if (myText.text === "cd Skelly") {
                            /*
                            skellyText.setActive(true);
                            skellyText.alpha = 1;
                            */

                            this.skellyText = true;

                            this.dialogue.create();

                            //skellyTalk.setActive(true).setVisible(true);
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
            },
            this,
        );

        /*else {
                if (event.key === "Enter") {
                    updateSkellyText();
                }
            }
                */

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

        if (this.registry.get("HasMaskPiece3")) {
            this.mask3.setActive(false).setVisible(false);
        }

        if (
            !this.registry.get("Mask3InView") ||
            this.registry.get("HasMaskPiece3")
        ) {
            if (this.frameCounter === 30) {
                const newBg =
                    this.background.texture.key === "Skelly1_1NoMask" ?
                        "Skelly1_2NoMask"
                    :   "Skelly1_1NoMask";

                this.background.setTexture(newBg);

                this.frameCounter = 0;

                this.mask3.setActive(false).setVisible(false);
            }
        } else {
            if (this.frameCounter === 30) {
                const newBg =
                    this.background.texture.key === "Skelly2_1Mask" ?
                        "Skelly2_2Mask"
                    :   "Skelly2_1Mask";

                this.background.setTexture(newBg);

                this.frameCounter = 0;
            }
        }
    }
}
