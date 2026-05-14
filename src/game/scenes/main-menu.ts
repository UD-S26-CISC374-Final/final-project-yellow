import { GameObjects, Scene } from "phaser";

import { EventBus } from "../event-bus";
//import type { ChangeableScene } from "../reactable-scene";

export class MainMenu extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    logoTween: Phaser.Tweens.Tween | null;

    frameCounter!: number;

    constructor() {
        super("MainMenu");
    }

    create() {
        this.frameCounter = 0;

        //this.registry.set("previousCommands", [] as string[]);

        this.sound.play("MainMenu", { loop: true });

        this.registry.set("lsACommandActive", true);

        this.registry.set("HasRoom4Key", false);
        this.registry.set("Room4KeyInHand", false);
        this.registry.set("Room4KeyInPocket", false);

        this.registry.set("Room4Open", true);

        this.registry.set("HasRoom11Key", false);
        this.registry.set("Room11KeyInHand", false);
        this.registry.set("Room11KeyInPocket", false);

        this.registry.set("Room11Open", true);

        this.registry.set("HasSkellyKey", false);
        this.registry.set("SkellyKeyInHand", false);
        this.registry.set("SkellyKeyInPocket", false);
        this.registry.set("SkellyOpen", false);

        this.registry.set("Tutorial", true);

        this.registry.set("pocketsOpen", false);

        this.registry.set("safeOpen", false);
        this.registry.set("padCloseUp", false);

        this.registry.set("talkedToMask", false);
        this.registry.set("MaskComplete", false);

        //remove later
        // this.registry.set("Mask1InPocket", true);
        // this.registry.set("Mask2InPocket", true);
        // this.registry.set("Mask3InPocket", true);
        // this.registry.set("Mask4InPocket", true);

        this.registry.set("ItemsInHand", [
            "Room4KeyInHand",
            "Room11KeyInHand",
            "SkellyKeyInHand",
            "Mask1InHand",
            "Mask2InHand",
            "Mask3InHand",
            "Mask4InHand",
        ]);
        this.registry.set("ItemsInPockets", [
            "Room4KeyInPocket",
            "Room11KeyInPocket",
            "SkellyKeyInPocket",
            "Mask1InPocket",
            "Mask2InPocket",
            "Mask3InPocket",
            "Mask4InPocket",
        ]);
        this.registry.set("ItemsNames", [
            "Room4Key",
            "Room11Key",
            "SkellyKey",
            "Mask1",
            "Mask2",
            "Mask3",
            "Mask4",
        ]);

        this.registry.set("code", Phaser.Math.Between(1000, 9999).toString());

        //this.registry.set("notes", ["WeirdNote"]);
        this.registry.set("noteOpen", false);

        this.background = this.add.image(400, 300, "MenuScreen1");
        this.background.setDisplaySize(this.scale.width + 5, this.scale.height);

        const myText = this.add.text(330, 500, "Insert Command Here", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#ff0000",
            padding: { x: 9, y: 9.5 },
            color: "#000000",
        });
        myText.setOrigin(0.15, 0);

        const title = this.add.text(400, 100, "Command The Dungeon!", {
            fontFamily: "Canterbury",
            fontSize: 70,
            color: "#786600",
        });
        title.setOrigin(0.5, 0);

        const titleBack = this.add.text(397, 97, "Command The Dungeon!", {
            fontFamily: "Canterbury",
            fontSize: 70,
            color: "#ffd900",
        });
        titleBack.setOrigin(0.5, 0);

        const description = this.add.text(
            400,
            170,
            "Are commands your friends? Or foes?",
            {
                fontFamily: "Canterbury",
                fontSize: 40,
                color: "#ffffff",
            },
        );
        description.setOrigin(0.5, 0);

        const instruction = this.add.text(
            400,
            450,
            "Type 'cd Start' to Begin",
            {
                fontFamily: "Arial-Black",
                fontSize: 38,
                color: "#ffffff",
            },
        );
        instruction.setOrigin(0.5, 0);

        this.input.keyboard!.on("keydown", () => {
            if (
                myText.text === "Insert Command Here" ||
                myText.text === "Command Not Found"
            ) {
                myText.text = "";
            }
            this.rexUI.edit(myText, {
                onClose: () => {
                    if (myText.text === "cd Start") {
                        /*
                        this.cameras.main.fadeOut(1000, 0, 0, 0);

                        this.time.delayedCall(1000, () => {
                            this.registry.set("comesFromMenu", true);
                            this.scene.start("Tutorial");
                        });
                        */

                        this.scene.start("cutscene");
                    }
                },
            });
        });
        EventBus.emit("current-scene-ready", this);
    }

    update(): void {
        this.frameCounter++;
        if (this.frameCounter === 30) {
            const newBg =
                this.background.texture.key === "MenuScreen1" ?
                    "MenuScreen2"
                :   "MenuScreen1";

            this.background.setTexture(newBg);

            this.frameCounter = 0;
        }
    }

    changeScene() {}
}
