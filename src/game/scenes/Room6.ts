import { EventBus } from "../event-bus";
import { AUTO, Scene } from "phaser";

import PhaserLogo from "../objects/phaser-logo";
import { CommandWriter } from "../CommandWriter";
import { Pockets } from "../Pockets";
import { Hand } from "../Hand";
import { Location } from "../Location";
import { RecurrentConstants } from "../RecurrentConstants";
//import Text from "phaser3-rex-plugins/plugins/gameobjects/tagtext/textbase/Text";
//import FpsText from "../objects/fps-text";

export class Room6 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    pockets!: Pockets;
    hand!: Hand;
    location!: Location;
    bookShelf: Phaser.GameObjects.Image;
    //fpsText: FpsText;

    //keyEnter = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    constructor() {
        super("Room6");
    }

    create() {
        this.sound.stopByKey("FireEffect");

        RecurrentConstants(this);

        const helpText = this.data.get("helpText") as Phaser.GameObjects.Text;
        const helpImage = this.data.get(
            "helpImage",
        ) as Phaser.GameObjects.Image;
        const objectiveText = this.data.get(
            "objectiveText",
        ) as Phaser.GameObjects.Text;
        const objectiveImage = this.data.get(
            "objectiveImage",
        ) as Phaser.GameObjects.Image;

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(400, 300, "Room6");
        this.background.setDisplaySize(this.scale.width + 5, this.scale.height);

        const cdRoom7 = this.add.text(130, 150, "Room7", {
            fixedWidth: AUTO,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        cdRoom7.setOrigin(0.15, 0);
        cdRoom7.setActive(false).setVisible(false);

        /*
        const booksText = this.add.text(220, 200, "BookShelf", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        booksText.setOrigin(0.15, 0);
        booksText.setActive(false).setVisible(false);
        

        this.bookShelf = this.add.image(140, 200, "Inventory");
        this.bookShelf.setActive(false).setVisible(false);
        this.bookShelf.setDepth(10);
        */

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

                    /*
                    if (
                        input === "cd BookShelf"
                        //&& !this.registry.get("bookCloseUp")
                    ) {
                        this.bookShelf.setActive(true).setVisible(true);
                        this.registry.set("bookCloseUp", true);
                    } else if (
                        input === "cd .." &&
                        this.registry.get("bookCloseUp")
                    ) {
                        this.backUp();
                    } else {
                        
                    }
                        */

                    CommandWriter.lsCommand(
                        input,
                        myText,
                        [
                            cdRoom7,
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
                            cdRoom7,
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
                        cdRoom7.text,
                        "Room7",
                    );

                    CommandWriter.cdBack(input, this, myText, "Room4Locked");

                    CommandWriter.help(
                        input,
                        this,
                        myText,
                        helpText,
                        helpImage,
                    );
                    CommandWriter.seeObjectives(
                        input,
                        this,
                        myText,
                        objectiveText,
                        objectiveImage,
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

        EventBus.emit("current-scene-ready", this);
    }

    backUp() {
        this.registry.set("bookCloseUp", false);
        this.bookShelf.setActive(false).setVisible(false);
    }

    update() {
        //this.fpsText.update();
    }

    changeScene() {
        //this.scene.start("GameOver");
    }
}
