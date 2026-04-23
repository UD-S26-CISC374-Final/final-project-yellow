import { AUTO, Scene } from "phaser";

export class DialogComponent {
    scene: Scene;

    starterDialog!: string;
    dialogueLines!: string[];
    xPos!: number;
    yPos!: number;

    sceneToChange!: string;

    changeScene!: boolean;

    onComplete?: () => void;

    characterIsTalking!: boolean;

    soundToPlay!: string;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    create() {
        let index = 0;

        /*
        const lines = [
            "You have been trapped in a dungeon.",
            "For not knowing your commands.",
            "Now you must use them, to escape.",
            "Listen to the mask, and to the dead man.",
            "Since they'll be your only company.",
        ];
        */

        const dialogue = this.scene.rexUI.add
            .dialog({
                x: this.xPos,
                y: this.yPos,
                //width: 400,
                height: 130,

                background: this.scene.rexUI.add.roundRectangle(
                    0,
                    0,
                    500,
                    800,
                    10,
                    0x222222,
                ),

                //title: this.add.text(0, 0, ""),

                content: this.scene.add.text(0, 0, this.starterDialog, {
                    wordWrap: { width: 240 },
                    lineSpacing: 8,
                }),

                actions: [this.scene.add.text(0, 0, "Enter")],

                space: {
                    left: 10,
                    right: 20,
                    top: 20,
                    bottom: 20,
                    title: 20,
                    content: 20,
                    action: 40,
                },
                proportion: {
                    content: 1,
                    actions: 0,
                },
            })
            .layout();

        const content = dialogue.getElement(
            "content",
        ) as Phaser.GameObjects.Text;

        const typing = this.scene.rexUI.add.textTyping(content, {
            speed: 30,
        });

        const newLine = () => {
            index++;

            if (
                index < this.dialogueLines.length ||
                (index < this.dialogueLines.length && this.characterIsTalking)
            ) {
                //content.setText(lines[index]);
                typing.start(this.dialogueLines[index]);
                /*
                while (typing.isTyping) {
                    this.scene.game.sound.play(this.soundToPlay, {
                        volume: 0.5,
                    });
                }
                    */
            } else {
                dialogue.setActive(false).setVisible(false);
                if (this.changeScene) {
                    this.scene.scene.start(this.sceneToChange);
                } else {
                    this.onComplete?.();
                }
            }
        };

        //dialogue.on("button.click", newLine);
        this.scene.input.keyboard!.on("keydown", (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                if (typing.isTyping) {
                    typing.stop(true);
                } else {
                    newLine();
                }
            }
        });
    }
}
