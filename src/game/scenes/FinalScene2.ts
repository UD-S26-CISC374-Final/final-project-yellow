import { GameObjects, Scene } from "phaser";
import { DialogComponent } from "../DialogComponent";

//import TextTyping from "phaser3-rex-plugins/plugins/texttyping-plugin.js";
//import { Dialog } from "phaser3-rex-plugins/templates/ui/ui-components.js";

//import { EventBus } from "../event-bus";
//import type { ChangeableScene } from "../reactable-scene";

export class FinalScene2 extends Scene {
    background: GameObjects.Image;

    dialogue!: DialogComponent;

    //index: number;

    constructor() {
        super("FinalScene2");
    }

    create() {
        this.cameras.main.fadeIn(150, 255, 255, 255);

        this.dialogue = new DialogComponent(this);

        this.dialogue.xPos = 400;
        this.dialogue.yPos = 300;

        this.dialogue.ImageTalk1 = null;
        this.dialogue.ImageTalk2 = null;

        //this.dialogue.width = 300;

        this.dialogue.soundToPlay = "IntroCutscene";

        this.dialogue.starterDialog = "IT WAS ME!                  ";

        this.dialogue.dialogueLines = [
            "IT WAS ME!.",
            "DR BART!",
            "AND MY ASSISTANT!",
            "{dog name}",
            "Hope you now know your commands",
            "Goodbye",
        ];

        this.dialogue.changeAfterSound = true;

        this.dialogue.changeScene = false;

        this.dialogue.sceneToChange = "Start";

        this.dialogue.create();
    }

    changeScene() {}
}
