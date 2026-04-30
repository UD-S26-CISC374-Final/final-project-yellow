import { EventBus } from "../event-bus";
import { Scene } from "phaser";

import PhaserLogo from "../objects/phaser-logo";
//import TextBox from "phaser3-rex-plugins/templates/ui/textbox/TextBox";
import { CommandWriter } from "../CommandWriter";
import { Pockets } from "../Pockets";
import { Hand } from "../Hand";
import { Location } from "../Location";
//import Text from "phaser3-rex-plugins/plugins/gameobjects/tagtext/textbase/Text";
//import FpsText from "../objects/fps-text";

export class Room1 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    pockets!: Pockets;
    hand!: Hand;
    location!: Location;

    //keyEnter = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    constructor() {
        super("Room1");
    }

    update() {}

    create() {
        //if (!this.input.keyboard) return;

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.registry.set("Tutorial", false);

        this.background = this.add.image(400, 300, "Room1Closed");
        if (this.registry.get("Room4Open")) {
            this.background.setTexture("Room1Open");
        }
        this.background.setDisplaySize(this.scale.width, this.scale.height);

        /*
        this.add.rectangle(400, 25, 800, 60, 0x000000, 1);
        this.add.rectangle(400, 20, 780, 40, 0x373737, 1);

    
        const LocationText = this.add.text(280, 5, "Current Location: Room1", {
            fixedWidth: 300,
            fixedHeight: 36,
            backgroundColor: "#00000000",
            padding: { x: 9, y: 9.5 },
        });
        LocationText.setActive(true);
        */

        const cdRoom2 = this.add.text(70, 200, "Room2", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        cdRoom2.setOrigin(0.15, 0);
        cdRoom2.setActive(false).setVisible(false);

        const cdRoom3 = this.add.text(590, 200, "Room3", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        cdRoom3.setOrigin(0.15, 0);
        cdRoom3.setActive(false).setVisible(false);

        const cdRoom4 = this.add.text(330, 150, "Room4", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        cdRoom4.setOrigin(0.15, 0);
        cdRoom4.setActive(false).setVisible(false);

        //const rooms : string[] = ["Room2","Room3","Room4"];

        const myText = this.add.text(330, 500, "Insert Command Here", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        myText.setOrigin(0.15, 0);

        const TutorialText = this.add.text(
            150,
            300,
            "Don't forget that 'cd ..' can be used to go back to the previous room.",
            {
                backgroundColor: "#000000",
                padding: { x: 9, y: 9.5 },
                wordWrap: { width: 640 },
            },
        );
        TutorialText.setOrigin(0.15, 0);
        if (this.registry.get("Room4Open")) {
            TutorialText.setActive(false);
            TutorialText.alpha = 0;
        } else if (
            this.registry.get("HasRoom4Key") &&
            !this.registry.get("Room4KeyInHand")
        ) {
            TutorialText.text =
                "Now we can't open the door if we are not holding the key, can't we? Go look into your pockets with the 'cd' command. And remember the 'mv' command from before? Inside your pockets, use it again like 'mv Room4Key Hand'.";
        } else if (this.registry.get("Room4KeyInHand")) {
            TutorialText.text =
                "Amazing! One last thing. When a door is locked, it means it needs a key. And since you have the key in your hand, you should 'move' it to the door to use it. You see what I'm saying? Do 'mv Room4Key Room4'.";
        }

        this.registry.set("CommandFound", false);

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

                    CommandWriter.cdBack(input, this, myText, "Tutorial");

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

                    CommandWriter.mvCommandToObject(
                        input,
                        this,
                        "Room4Key",
                        this.background,
                        cdRoom4.text,
                        "Room1Open",
                        myText,
                        "HasRoom4Key",
                        "Room4Open",
                        "Room4KeyInHand",
                    );

                    CommandWriter.lsCommand(
                        input,
                        myText,
                        [
                            cdRoom2,
                            cdRoom3,
                            cdRoom4,
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
                            cdRoom2,
                            cdRoom3,
                            cdRoom4,
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
                        cdRoom2.text,
                        "Room2",
                    );

                    CommandWriter.cdCommand(
                        input,
                        this,
                        myText,
                        cdRoom3.text,
                        "Room3",
                    );

                    CommandWriter.cdCommandLocked(
                        input,
                        this,
                        myText,
                        cdRoom4.text,
                        "Room4Locked",
                        "Room4Open",
                    );

                    CommandWriter.checkCommandFound(myText);
                    if (this.registry.get("Room4Open")) {
                        TutorialText.setActive(false);
                        TutorialText.alpha = 0;
                    } else if (this.registry.get("Room4KeyInHand")) {
                        TutorialText.text =
                            "To open the door, move the key to the door by typing 'mv Room4Key Room4'.";
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

    /*
    update() {
        //this.fpsText.update();
    }

    changeScene() {
        //this.scene.start("GameOver");
    }
        */
}
