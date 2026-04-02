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
        this.registry.set("SkellyOpen", false);
        this.registry.set("HasKey1", false);

        this.background = this.add.image(400, 300, "background");

        const myText = this.add.text(330, 300, 'Insert Command Here', 
            { fixedWidth: 200, fixedHeight: 36, backgroundColor: "#ff0000", 
                padding: {x: 9, y: 9.5}, color: '#000000'})
            myText.setOrigin(0.15, 0)

            myText.setInteractive().on('pointerdown', () => {
                this.rexUI.edit(myText, {
                    onClose: () => {
                        if(myText.text === "cd Start"){
                            this.scene.start("Level1");
                        }
                    }
                })
        })



        

        /*
        this.logo = this.add.image(400, 300, "logo").setDepth(100);

        this.title = this.add
            .text(400, 400, "Main Menu", {
                fontFamily: "Arial Black",
                fontSize: 38,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100);

            */
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
