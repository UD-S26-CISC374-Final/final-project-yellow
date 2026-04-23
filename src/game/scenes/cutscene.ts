import { GameObjects, Scene } from "phaser";
import { DialogComponent } from "../DialogComponent";

//import TextTyping from "phaser3-rex-plugins/plugins/texttyping-plugin.js";
//import { Dialog } from "phaser3-rex-plugins/templates/ui/ui-components.js";

//import { EventBus } from "../event-bus";
import type { ChangeableScene } from "../reactable-scene";

export class cutscene extends Scene implements ChangeableScene {
    background: GameObjects.Image;

    dialogue!: DialogComponent;

    //index: number;

    constructor() {
        super("cutscene");
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.dialogue = new DialogComponent(this);

        this.dialogue.xPos = 400;
        this.dialogue.yPos = 300;

        this.dialogue.ImageTalk1 = null;
        this.dialogue.ImageTalk2 = null;

        //this.dialogue.width = 300;

        this.dialogue.soundToPlay = "IntroCutscene";

        this.dialogue.starterDialog =
            "You have been trapped in a dungeon.         ";

        this.dialogue.dialogueLines = [
            "You have been trapped in a dungeon.",
            "For not knowing your commands.",
            "Now you must use them, to escape.",
            "Listen to the mask, and to the dead man.",
            "Since they'll be your only company.",
        ];

        this.dialogue.changeScene = true;

        this.dialogue.sceneToChange = "Tutorial";

        this.dialogue.create();

        //this.cameras.main.fadeOut(1000, 0, 0, 0);

        /*
        //this.index = 0;

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        let index = 0;

        const lines = [
            "You have been trapped in a dungeon.",
            "For not knowing your commands.",
            "Now you must use them, to escape.",
            "Listen to the mask, and to the dead man.",
            "Since they'll be your only company.",
        ];

        const dialogue = this.rexUI.add
            .dialog({
                x: 400,
                y: 300,

                background: this.rexUI.add.roundRectangle(
                    0,
                    0,
                    300,
                    150,
                    10,
                    0x222222,
                ),

                //title: this.add.text(0, 0, ""),

                content: this.add.text(
                    0,
                    0,
                    "You have been trapped in a dungeon.       ",
                ),

                actions: [this.add.text(0, 0, "Enter")],

                space: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10,
                    title: 10,
                    content: 10,
                    action: 10,
                },
            })
            .layout();

        const content = dialogue.getElement(
            "content",
        ) as Phaser.GameObjects.Text;

        const typing = this.rexUI.add.textTyping(content, {
            speed: 30,
        });

        const newLine = () => {
            index++;

            if (index < lines.length) {
                //content.setText(lines[index]);
                typing.start(lines[index]);
            } else {
                dialogue.setVisible(false);
                this.scene.start("Tutorial");
            }
        };

        //dialogue.on("button.click", newLine);
        this.input.keyboard!.on("keydown", (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                if (typing.isTyping) {
                    typing.stop(true);
                } else {
                    newLine();
                }
            }
        });
        */
    }

    changeScene() {}
}
