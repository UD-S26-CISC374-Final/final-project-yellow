import { GameObjects, Scene } from "phaser";
import { DialogComponent } from "../DialogComponent";

//import TextTyping from "phaser3-rex-plugins/plugins/texttyping-plugin.js";
//import { Dialog } from "phaser3-rex-plugins/templates/ui/ui-components.js";

//import { EventBus } from "../event-bus";
//import type { ChangeableScene } from "../reactable-scene";

export class FinalScene extends Scene {
    background: GameObjects.Image;

    dialogue!: DialogComponent;

    //index: number;

    constructor() {
        super("FinalScene");
    }

    create() {
        this.registry.set("FinalSceneChange", true);

        this.background = this.add.image(400, 300, "FinalCutscene2_PreBart");
        this.background.setDisplaySize(this.scale.width, this.scale.height);

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.dialogue = new DialogComponent(this);

        this.dialogue.xPos = 400;
        this.dialogue.yPos = 400;

        this.dialogue.ImageTalk1 = null;
        this.dialogue.ImageTalk2 = null;

        //this.dialogue.width = 300;

        this.dialogue.soundToPlay = "IntroCutscene";

        this.dialogue.starterDialog = "Congratulations.                  ";

        this.dialogue.dialogueLines = [
            "Congratulations.",
            "You have successfully escaped the command dungeon.",
            "You are free too leave.",
            "But first",
            "Wouldn't you like to know who trapped you here?",
            "Wouldn't you like to know who's responsible for all of this?",
            "Well...",
            "I'll show you",
        ];

        this.dialogue.changeAfterSound = true;

        this.dialogue.changeScene = true;

        this.dialogue.sceneToChange = "FinalScene2";

        this.dialogue.create();
    }

    changeScene() {}
}
