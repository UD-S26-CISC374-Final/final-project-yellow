import { GameObjects, Scene } from "phaser";

import { EventBus } from "../event-bus";
import type { ChangeableScene } from "../reactable-scene";

export class MainMenu extends Scene implements ChangeableScene {
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    logoTween: Phaser.Tweens.Tween | null;

    constructor() {
        super("MainMenu");
    }

    create() {
        //console.log("Empezo");
        //if (!this.input.keyboard) return;

        this.registry.set("SkellyOpen", false);
        this.registry.set("HasKey1", false);
        this.registry.set("pocketsOpen", false);
        this.registry.set("key1InHand", false);
        this.registry.set("key1InPocket", false);
        this.registry.set("Tutorial", true);

        this.registry.set("ItemsInHand", ["key1InHand"]);
        this.registry.set("ItemsInPockets", ["key1InPocket"]);
        this.registry.set("ItemsNames", ["Key"]);

        this.registry.set("code", Phaser.Math.Between(1000, 9999).toString());

        //this.registry.set("notes", ["WeirdNote"]);
        this.registry.set("noteOpen", false);

        this.background = this.add.image(400, 300, "background");

        const myText = this.add.text(330, 300, "Insert Command Here", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#ff0000",
            padding: { x: 9, y: 9.5 },
            color: "#000000",
        });
        myText.setOrigin(0.15, 0);

        const title = this.add.text(400, 100, "Type 'cd Start' to Begin", {
            fontFamily: "Arial Black",
            fontSize: 38,
            color: "#ffffff",
        });
        title.setOrigin(0.5, 0);

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
                        this.scene.start("Tutorial");
                    }
                },
            });
        });
        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        /*
        if (this.logoTween) {
            this.logoTween.stop();
            this.logoTween = null;
        }

        this.scene.start("Level1");
        */
    }

    moveSprite(callback: ({ x, y }: { x: number; y: number }) => void) {
        if (this.logoTween) {
            if (this.logoTween.isPlaying()) {
                this.logoTween.pause();
            } else {
                this.logoTween.play();
            }
        } else {
            this.logoTween = this.tweens.add({
                targets: this.logo,
                x: { value: 750, duration: 3000, ease: "Back.easeInOut" },
                y: { value: 80, duration: 1500, ease: "Sine.easeOut" },
                yoyo: true,
                repeat: -1,
                onUpdate: () => {
                    callback({
                        x: Math.floor(this.logo.x),
                        y: Math.floor(this.logo.y),
                    });
                },
            });
        }
    }
}
