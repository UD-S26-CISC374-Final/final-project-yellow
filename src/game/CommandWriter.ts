import { EventBus } from "./event-bus";
import { GameObjects, Scene } from "phaser";
//import TextBox from "phaser3-rex-plugins/templates/ui/textbox/TextBox";

//import PhaserLogo from "../objects/phaser-logo";
//import Text from "phaser3-rex-plugins/plugins/gameobjects/tagtext/textbase/Text";
//import FpsText from "../objects/fps-text";

export class CommandWriter {
    scene: Phaser.Scene;

    //camera: Phaser.Cameras.Scene2D.Camera;
    //background: Phaser.GameObjects.Image;
    //phaserLogo: PhaserLogo;
    //fpsText: FpsText;

    myText!: Phaser.GameObjects.Text;

    //keyEnter = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    static lsCommand(
        input: string,
        myText: Phaser.GameObjects.Text,
        objectsToShow: GameObjects.Text[],
    ) {
        if (input === "ls") {
            for (let i = 0; i < objectsToShow.length; i++) {
                objectsToShow[i].setActive(true);
                objectsToShow[i].alpha = 1;
            }

            myText.text = "Insert Command Here";
        }
    }

    static cdCommand(
        input: string,
        scene: Scene,
        myText: Phaser.GameObjects.Text,
        //scenesAvailable: GameObjects.Text,
        sceneToChange: string,
        nextSceneName: string,
    ) {
        if (input === "cd " + sceneToChange) {
            scene.scene.start(nextSceneName);
        }

        myText.text = "";
    }

    static cdCommandLocked(
        input: string,
        scene: Scene,
        myText: Phaser.GameObjects.Text,
        //scenesAvailable: GameObjects.Text,
        sceneToChange: string,
        nextSceneName: string,
        globalVar: string,
    ) {
        if (input === "cd " + sceneToChange && scene.registry.get(globalVar)) {
            scene.scene.start(nextSceneName);
        } else if (
            input === "cd " + sceneToChange &&
            !scene.registry.get(globalVar)
        ) {
            myText.text = "Door Locked";
        }
        myText.text = "";
    }

    static cdBack(
        input: string,
        scene: Scene,
        myText: Phaser.GameObjects.Text,
        //scenesAvailable: GameObjects.Text,
        previousSceneName: string,
    ) {
        if (input === "cd ..") {
            scene.scene.start(previousSceneName);
        }

        myText.text = "";
    }

    static mvCommandToPockets(
        input: string,
        scene: Scene,
        objectText: string,
        object: GameObjects.Text,
        myText: Phaser.GameObjects.Text,
        globalVar: string,
    ) {
        if (input === "mv " + objectText + " pockets") {
            object.setActive(false);
            object.alpha = 0;
            scene.registry.set(globalVar, true);
            myText.text = "";
        }
    }

    static mvCommandToObject(
        input: string,
        scene: Scene,
        objectText: string,
        //object: GameObjects.Text,

        background: Phaser.GameObjects.Image,

        objectToInteract: string,
        textureToLoad: string,

        myText: Phaser.GameObjects.Text,
        globalVar: string,
        objectGlobalVar: string,
    ) {
        if (
            input === "mv " + objectText + " " + objectToInteract &&
            scene.registry.get(globalVar)
        ) {
            scene.registry.set(objectGlobalVar, true);
            background.setTexture(textureToLoad);
            myText.text = "";
        }
    }

    constructor(scene: Phaser.Scene) {
        //super("Level1");
        this.scene = scene;
    }

    create() {
        //if (!this.scene.input.keyboard) return;

        this.myText = this.scene.add.text(330, 500, "Insert Command Here", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        this.myText.setOrigin(0.15, 0);

        this.scene.input.keyboard!.on("keydown", () => {
            if (
                this.myText.text === "Insert Command Here" ||
                this.myText.text === "Command Not Found"
            ) {
                this.myText.text = "";
            }
            this.scene.rexUI.edit(this.myText, {
                onClose: () => {},
            });
        });

        //this.phaserLogo = new PhaserLogo(this, this.cameras.main.width / 2, 0);
        //this.fpsText = new FpsText(this);

        EventBus.emit("current-scene-ready", this);
    }

    update() {
        //this.fpsText.update();
    }

    changeScene() {
        //this.scene.start("GameOver");
    }
}
