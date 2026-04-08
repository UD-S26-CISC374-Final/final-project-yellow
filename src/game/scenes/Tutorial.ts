import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import PhaserLogo from "../objects/phaser-logo";
import { CommandWriter } from "../CommandWriter";
import { Pockets } from "../Pockets";
import { Hand } from "../Hand";

export class Tutorial extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    pockets!: Pockets;
    hand!: Hand;

    constructor() {
        super("Tutorial");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(400, 300, "DoorOnlyFront");
        this.background.setDisplaySize(this.scale.width, this.scale.height);

        this.add.rectangle(400, 25, 800, 60, 0x000000, 1);
        this.add.rectangle(400, 20, 780, 40, 0x373737, 1);

        //let canType = true;

        const LocationText = this.add.text(
            280,
            5,
            "Current Location: Tutorial",
            {
                fixedWidth: 300,
                fixedHeight: 36,
                backgroundColor: "#00000000",
                padding: { x: 9, y: 9.5 },
            },
        );
        LocationText.setActive(true);

        const cdRoom1 = this.add.text(330, 150, "Room1", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        cdRoom1.setOrigin(0.15, 0);
        cdRoom1.setActive(false);
        cdRoom1.alpha = 0;

        const myText = this.add.text(330, 500, "Insert Command Here", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        myText.setOrigin(0.15, 0);

        const TutorialText = this.add.text(150, 300, "Tutorial Text", {
            fixedWidth: 650,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
            wordWrap: { width: 640 },
        });
        TutorialText.setOrigin(0.15, 0);
        TutorialText.text =
            "The 'ls' command will show you the places you can go from here. Try typing 'ls' and pressing enter!";
        if (this.registry.get("Tutorial") === false) {
            TutorialText.setActive(false);
            TutorialText.alpha = 0;
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
            if (cdRoom1.active && this.registry.get("Tutorial") === true) {
                TutorialText.text =
                    "The 'cd' command allows you to move from one location to another. Look at the text by the door. Try entering 'cd Room1' to move on from the Tutorial!";
            }
            this.rexUI.edit(myText, {
                onClose: () => {
                    const input = myText.text;

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
                        "Key",
                        this.background,
                        cdRoom1.text,
                        "Room1",
                        myText,
                        "HasKey1",
                        "Room4Open",
                    );
                    CommandWriter.lsCommand(input, myText, [cdRoom1]);

                    CommandWriter.cdCommand(
                        input,
                        this,
                        myText,
                        cdRoom1.text,
                        "Room1",
                    );

                    CommandWriter.checkCommandFound(myText);
                },
            });
        });

        this.pockets = new Pockets(this);
        this.pockets.create();

        this.hand = new Hand(this);
        this.hand.create();

        EventBus.emit("current-scene-ready", this);
    }
}
