import { CommandWriter } from "../CommandWriter";
import { EventBus } from "../event-bus";
import { Scene } from "phaser";
import { Pockets } from "../Pockets";
import { Hand } from "../Hand";

//import PhaserLogo from "../objects/phaser-logo";

export class Room2 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    pockets!: Pockets;
    hand!: Hand;
    //phaserLogo: PhaserLogo;
    //fpsText: FpsText;

    //keyEnter = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    constructor() {
        super("Room2");
    }

    create() {
        //if (!this.input.keyboard) return;

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(400, 300, "room1");
        if (this.registry.get("SkellyOpen")) {
            this.background = this.add.image(400, 300, "DoorOnlyFront");
        }

        const skelly = this.add.text(330, 200, "Door", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        skelly.setOrigin(0.15, 0);
        skelly.setActive(false);
        skelly.alpha = 0;

        const hiddenObjectTest = this.add.text(500, 200, "Hidden", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        hiddenObjectTest.setOrigin(0.15, 0);
        hiddenObjectTest.setActive(false);
        hiddenObjectTest.alpha = 0;

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

                    CommandWriter.lsCommand(
                        input,
                        myText,
                        [skelly],
                        this.hand,
                        this,
                    );

                    CommandWriter.lsACommand(
                        input,
                        myText,
                        [skelly, hiddenObjectTest],
                        this.hand,
                        this,
                    );

                    CommandWriter.cdCommandLocked(
                        input,
                        this,
                        myText,
                        skelly.text,
                        "Skelly",
                        "SkellyOpen",
                    );

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

                    CommandWriter.mvCommandToObject(
                        input,
                        this,
                        "SkellyKey",
                        this.background,
                        skelly.text,
                        "DoorOnlyFront",
                        myText,
                        "HasSkellyKey",
                        "SkellyOpen",
                        "SkellyKeyInHand",
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

        EventBus.emit("current-scene-ready", this);
    }

    update() {
        //this.fpsText.update();
    }

    changeScene() {
        //this.scene.start("GameOver");
    }
}
