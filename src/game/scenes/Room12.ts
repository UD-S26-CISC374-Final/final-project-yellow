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

    frameCounter!: number;
    //keyEnter = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    constructor() {
        super("Room12");
    }

    create() {
        this.frameCounter = 0;

        this.maskText = false;

        this.dialogue = new DialogComponent(this);

        this.dialogue.xPos = 500;
        this.dialogue.yPos = 300;

        this.dialogue.characterIsTalking = this.maskText;

        this.dialogue.soundToPlay = "Skeleton";

        this.dialogue.changeScene = false;

        this.dialogue.starterDialog = "Holy cow";

        this.dialogue.dialogueLines = [
            "Holy cow",
            "Another one?",
            "I have to tell you, the guy that built the place doesn't get tired of this",
            "Of putting people in here I mean",
            "Anyways...",
            "I'm sure you don't care enough about my name",
            "So I'm gonna get to the point",
            "In the next room there's an exit",
            "But you are going to need 4 masks",
            "My 4 brothers",
            "Between you and me, they aren't as smart as me",
            "So, just find them, put them in the correct order, and you're out",
            "The problem is that they are pretty well hidden",
            "So you'll need to talk to a friend of mine.",
            "He'll give you the tools to look for my brother",
            "Pick up the key next door, and find the door with his face.",
            "One last thing",
            "I can't tell you directly the order in which to put the pieces.",
            "Only in the way of a riddle",
            "Listen to this because you might know it too.",
            "The story of a dog that ran fast for.",
            "A squirell that climbed to the top of a tree.",
            "While it was holding one strawberry",
        ];

        this.dialogue.dialogueAfterTalked = [
            "",
            "Listen to this because you might know it too.",
            "The story of a dog that ran fast for.",
            "A squirell that climbed to the top of a tree.",
            "While it was holding one strawberry",
        ];

        this.dialogue.changeScene = false;

        this.dialogue.hasTalked = "MaskTalked";

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(400, 300, "Room12_1");
        this.background.setDisplaySize(this.scale.width + 5, this.scale.height);

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

        this.input.keyboard!.on("keydown", (event: KeyboardEvent) => {
            if (
                event.key !== "Enter" &&
                (myText.text === "Insert Command Here" ||
                    myText.text === "Command Not Found" ||
                    myText.text === "Door Locked")
            ) {
                myText.text = "";
            }
            if (this.maskText) {
                this.dialogue.onComplete = () => {
                    this.maskText = false;

                    myText.text = "Insert Command Here";

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
                            cdRoomEnd,
                            cdMask,
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
                            cdRoomEnd,
                            cdMask,
                            this.pockets.pocketsIndicator,
                            this.hand.handPrompt,
                        ],
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
        if (this.frameCounter === 30) {
            const newBg =
                this.background.texture.key === "Room12_1" ?
                    "Room12_2"
                :   "Room12_1";

            this.background.setTexture(newBg);

            this.frameCounter = 0;
        }
    }
}
