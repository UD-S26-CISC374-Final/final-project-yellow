import { EventBus } from "../event-bus";
import { Scene } from "phaser";

import PhaserLogo from "../objects/phaser-logo";
import { CommandWriter } from "../CommandWriter";
import { Pockets } from "../Pockets";
import { Hand } from "../Hand";
import { Location } from "../Location";
import { DialogComponent } from "../DialogComponent";
//import Text from "phaser3-rex-plugins/plugins/gameobjects/tagtext/textbase/Text";
//import FpsText from "../objects/fps-text";

export class Room12 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    pockets!: Pockets;
    hand!: Hand;
    location!: Location;
    //fpsText: FpsText;
    maskText!: boolean;
    //dialogueTexts!: string[];

    dialogue!: DialogComponent;
    //keyEnter = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    constructor() {
        super("Room12");
    }

    create() {
        this.maskText = false;

        this.dialogue = new DialogComponent(this);

        this.dialogue.xPos = 500;
        this.dialogue.yPos = 300;

        this.dialogue.characterIsTalking = this.maskText;

        this.dialogue.soundToPlay = "Skeleton";

        this.dialogue.changeScene = false;

        this.dialogue.starterDialog = "Holy cow                           ";

        this.dialogue.dialogueLines = [
            "Holy cow",
            "Another one?",
            "I have to tell you, the guy that built the place doesn't get tired of this",
            "Of putting people in here I mean",
            "Anyway",
            "I'm sure you don't care enough about my name",
            "So I'm gonna get to the point",
            "In the next room there's an exit",
            "But you are going to need 4 pieces of a mask",
            "The 4 pieces of my brother",
            "He kinda deserved it thow, being shattered",
            "So, just find the pieces, put them in the correct order, and you're out",
            "The problem is my brother was hidden well",
            "So you'll need to talk to a friend of mine, he'll give you the tools to look for my brother",
            "Pick up the key next door, and find the door with his face.",
            "One last thing",
            "I can't tell you directly the order in which to put the pieces, only in the way of a riddle",
            "Listen to this because you might know it too, the story of a dog that run fast for, a squirell that climbed to the top of a tree, while it was holding one strawberry",
        ];

        this.dialogue.changeScene = false;

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(400, 300, "OnlyDoorLeft");

        /*
        this.dialogueTexts = [
            "Holy cow",
            "Another one?",
            "I have to tell you, the guy that built the place doesn't get tired of this",
            "Of putting people in here I mean",
            "Anyway",
            "I'm sure you don't care enough about my name",
            "So I'm gonna get to the point",
            "In the next room there's an exit",
            "But you are going to need 4 pieces of a mask",
            "The 4 pieces of my brother",
            "He kinda deserved it thow, being shattered",
            "So, just find the pieces, put them in the correct order, and you're out",
            "The problem is my brother was hidden well",
            "So you'll need to talk to a friend of mine, he'll give you the tools to look for my brother",
            "Pick up the key next door, and find the door with his face.",
            "One last thing",
            "I can't tell you directly the order in which to put the pieces, only in the way of a riddle",
            "Listen to this because you might know it too, the story of a dog that run fast for, a squirell that climbed to the top of a tree, while it was holding one strawberry",
        ];
        */

        const cdRoomEnd = this.add.text(70, 200, "RoomEnd", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        cdRoomEnd.setOrigin(0.15, 0);
        cdRoomEnd.setActive(false).setVisible(false);

        const myText = this.add.text(330, 500, "Insert Command Here", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        myText.setOrigin(0.15, 0);

        const cdMask = this.add.text(400, 100, "Mask", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        cdMask.setOrigin(0.15, 0);
        cdMask.setActive(false).setVisible(false);

        /*
        const maskText = this.add.text(400, 150, "", {
            wordWrap: { width: 200 },
            backgroundColor: "#000000",
        });
        maskText.setOrigin(0.15, 0);
        maskText.setActive(false);
        maskText.alpha = 0;
        let maskTextIndex = 0;
        if (this.registry.get("talkedToMask")) {
            maskTextIndex = this.dialogueTexts.length - 2;
        }
            

        const updateMaskText = () => {
            if (maskTextIndex >= 1) {
                maskText.text = this.dialogueTexts[maskTextIndex];
            }
            maskTextIndex++;
            if (maskTextIndex > this.dialogueTexts.length) {
                this.registry.set("talkedToMask", true);
                maskText.setActive(false);
                maskText.alpha = 0;
                maskTextIndex = this.dialogueTexts.length - 1;
                maskText.text =
                    "Listen to this because you might know it too, the story of a dog that run fast for, a squirell that climbed to the top of a tree, while it was holding one strawberry";
                this.registry.set("lsACommandActive", true);
                myText.text = "Insert Command Here";
            }
        };
        */

        this.input.keyboard!.on("keydown", (event: KeyboardEvent) => {
            if (
                event.key !== "Enter" &&
                (myText.text === "Insert Command Here" ||
                    myText.text === "Command Not Found" ||
                    myText.text === "Door Locked")
            ) {
                myText.text = "";
            }
            if (!this.maskText) {
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

                        CommandWriter.lsCommand(
                            input,
                            myText,
                            [cdMask],
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

                        if (myText.text === "cd Mask") {
                            /*
                            maskText.setActive(true);
                            maskText.alpha = 1;
                            myText.text = "Insert Command Here";
                            */

                            this.maskText = true;

                            this.dialogue.create();
                        }

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
            } else {
                this.dialogue.onComplete = () => {
                    this.maskText = false;

                    myText.text = "Insert Command Here";

                    console.log("Reached boolean");

                    this.rexUI.edit(myText);
                };
            }
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

    update() {
        //this.fpsText.update();
    }

    changeScene() {
        //this.scene.start("GameOver");
    }
}
