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
    }

    changeScene() {}
}
