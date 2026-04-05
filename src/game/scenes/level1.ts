import { EventBus } from "../event-bus";
import { Scene } from "phaser";

import PhaserLogo from "../objects/phaser-logo";
//import TextBox from "phaser3-rex-plugins/templates/ui/textbox/TextBox";
import { CommandWriter } from "../CommandWriter";
//import Text from "phaser3-rex-plugins/plugins/gameobjects/tagtext/textbase/Text";
//import FpsText from "../objects/fps-text";

export class Level1 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    //fpsText: FpsText;

    //keyEnter = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    constructor() {
        super("Level1");
    }

    create() {
        //if (!this.input.keyboard) return;

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(400, 300, "level1locked");
        if (this.registry.get("Room4Open")) {
            this.background = this.add.image(400, 300, "level1");
        }
        this.background.setDisplaySize(this.scale.width, this.scale.height);

        const cdRoom2 = this.add.text(70, 200, "Room2", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        cdRoom2.setOrigin(0.15, 0);
        cdRoom2.setActive(false);
        cdRoom2.alpha = 0;

        const cdRoom3 = this.add.text(590, 200, "Room3", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        cdRoom3.setOrigin(0.15, 0);
        cdRoom3.setActive(false);
        cdRoom3.alpha = 0;

        const cdRoom4 = this.add.text(330, 150, "Room4", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        cdRoom4.setOrigin(0.15, 0);
        cdRoom4.setActive(false);
        cdRoom4.alpha = 0;

        //const rooms : string[] = ["Room2","Room3","Room4"];

        const myText = this.add.text(330, 500, "Insert Command Here", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        myText.setOrigin(0.15, 0);

        this.input.keyboard!.on("keydown", () => {
            if (
                myText.text === "Insert Command Here" ||
                myText.text === "Command Not Found"
            ) {
                myText.text = "";
            }
            this.rexUI.edit(myText, {
                onClose: () => {
                    const input = myText.text;

                    if (
                        myText.text === "mv Key " + cdRoom4.text &&
                        cdRoom4.active
                    ) {
                        this.registry.set("Room4Open", true);
                        this.background.setTexture("level1");
                        myText.text = "Insert Command Here";
                    }

                    CommandWriter.lsCommand(input, myText, [
                        cdRoom2,
                        cdRoom3,
                        cdRoom4,
                    ]);

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
                        "RoomStartRight",
                    );

                    CommandWriter.cdCommandLocked(
                        input,
                        this,
                        myText,
                        cdRoom4.text,
                        "Room4Locked",
                        "Room4Open",
                    );
                    /*

                    if (
                        myText.text === "mov Key " + cdRoom4.text &&
                        cdRoom4.active
                    ) {
                        this.registry.set("Room4Open", true);
                        this.background.setTexture("level1");
                        myText.text = "Insert Command Here";
                    }
                    */

                    /*
                    if (
                        myText.text === "cd " + cdRoom2.text &&
                        cdRoom2.active
                    ) {
                        this.scene.start("Room2");
                    } else if (
                        myText.text === "cd " + cdRoom4.text &&
                        cdRoom4.active
                    ) {
                        if (this.registry.get("Room4Open")) {
                            this.camera.zoomTo(2, 2000, "Sine");
                            this.camera.fadeOut(1000, 0, 0, 0);
                            this.time.delayedCall(1000, () => {
                                this.scene.start("Room4Locked");
                            });
                        } else {
                            myText.text = "The door is locked";
                        }
                    } else 
                        
                        

                    if (
                        myText.text === "mov Key " + cdRoom4.text &&
                        cdRoom4.active
                    ) {
                        this.registry.set("Room4Open", true);
                        this.background.setTexture("level1");
                        myText.text = "Insert Command Here";
                    }
                    /*else {
                    else if (
                        myText.text === "cd " + cdRoom3.text &&
                        cdRoom3.active
                    ) {
                        this.scene.start("RoomStartRight");
                    } 
                        */
                    //myText.text = "Command Not Found";
                    //}
                },
            });
        });

        //this.phaserLogo = new PhaserLogo(this, this.cameras.main.width / 2, 0);
        //this.fpsText = new FpsText(this);

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
