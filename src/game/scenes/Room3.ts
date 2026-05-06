import { CommandWriter } from "../CommandWriter";
import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import { Pockets } from "../Pockets";
import { Hand } from "../Hand";
import { Location } from "../Location";

//import PhaserLogo from "../objects/phaser-logo";

export class Room3 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    pockets!: Pockets;
    hand!: Hand;
    location!: Location;
    //phaserLogo: PhaserLogo;
    //fpsText: FpsText;

    //keyEnter = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    constructor() {
        super("Room3");
    }

    create() {
        //if (!this.input.keyboard) return;

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(400, 300, "Room3Key");
        if (this.registry.get("HasRoom4Key")) {
            this.background.setTexture("Room3NoKey");
        }
        this.background.setDisplaySize(this.scale.width + 5, this.scale.height);

        const KeyObject = this.add.text(330, 200, "Room4Key", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#3898ff",
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

        const tutorialText = this.add.text(
            150,
            300,
            "There's no way to go from here. How about you try the 'ls' command again? You might find something useful.",
            {
                fixedWidth: 200,
                backgroundColor: "#000000",
                padding: { x: 9, y: 9.5 },
                wordWrap: { width: 200 },
            },
        );
        tutorialText.setOrigin(0.15, 0);
        if (this.registry.get("HasRoom4Key")) {
            tutorialText.setActive(false);
            tutorialText.alpha = 0;
        }

        this.input.keyboard!.on("keydown", (event: KeyboardEvent) => {
            if (
                event.key !== "Enter" &&
                (myText.text === "Insert Command Here" ||
                    myText.text === "Command Not Found" ||
                    myText.text === "Door Locked")
            ) {
                myText.text = "";
            }
            if (this.registry.get("HasRoom4Key")) {
                /*
                tutorialText.setActive(false);
                tutorialText.alpha = 0;
                */

                tutorialText.text =
                    "Note: Remember that the blue squares are items you can put in your pockets. Black squares are places, people, or things only accessible with the 'cd' command. They are not to be stored.";
                tutorialText.setPosition(450, 300);
            } else if (KeyObject.active) {
                tutorialText.text =
                    "Wow, look at that! A key. It might be useful. Blue boxes represent items that can be moved. Try to 'move' it to your pockets. Type 'mv' plus a space, the items name, and the name of where will it go (pockets in this case).";
                tutorialText.setPosition(450, 300);
            }
            this.rexUI.edit(myText, {
                onClose: () => {
                    const input = myText.text;

                    CommandWriter.mvCommandToPockets(
                        input,
                        this,
                        KeyObject.text,
                        KeyObject,
                        myText,
                        "HasRoom4Key",
                        "Room4KeyInPocket",
                    );

                    if (
                        myText.text === "ls" &&
                        !KeyObject.active &&
                        !this.registry.get("HasRoom4Key")
                    ) {
                        KeyObject.setActive(true);
                        KeyObject.alpha = 1;

                        this.pockets.pocketsIndicator
                            .setActive(true)
                            .setVisible(true);
                        this.hand.handPrompt.setActive(true).setVisible(true);

                        myText.text = "Insert Command Here";
                    } else if (
                        (myText.text === "ls" && KeyObject.active) ||
                        (myText.text === "ls" &&
                            this.registry.get("HasRoom4Key"))
                    ) {
                        myText.text = "Insert Command Here";
                    }

                    CommandWriter.cdBack(input, this, myText, "Room1");

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
        if (!this.registry.get("HasRoom4Key")) {
            this.background.setTexture("Room3Key");
        } else {
            this.background.setTexture("Room3NoKey");
        }
    }
}
