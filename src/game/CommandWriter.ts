import { EventBus } from "./event-bus";
import { GameObjects, Scene } from "phaser";
import { Pockets } from "./Pockets";
import { Hand } from "./Hand";
//import TextBox from "phaser3-rex-plugins/templates/ui/textbox/TextBox";

//import PhaserLogo from "../objects/phaser-logo";
//import Text from "phaser3-rex-plugins/plugins/gameobjects/tagtext/textbase/Text";
//import FpsText from "../objects/fps-text";

export class CommandWriter {
    scene: Phaser.Scene;

    pockets!: Pockets;
    hand!: Hand;
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
        if (
            input === "cd " + sceneToChange &&
            !scene.registry.get("pocketsOpen")
        ) {
            scene.scene.start(nextSceneName);
            myText.text = "Insert Command Here";
        }
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
        if (
            input === "cd " + sceneToChange &&
            scene.registry.get(globalVar) &&
            !scene.registry.get("pocketsOpen")
        ) {
            scene.scene.start(nextSceneName);
            myText.text = "Insert Command Here";
        } else if (
            input === "cd " + sceneToChange &&
            !scene.registry.get(globalVar)
        ) {
            myText.text = "Door Locked";
        }
    }

    static cdBack(
        input: string,
        scene: Scene,
        myText: Phaser.GameObjects.Text,
        //scenesAvailable: GameObjects.Text,
        previousSceneName: string,
    ) {
        if (input === "cd .." && !scene.registry.get("pocketsOpen")) {
            scene.scene.start(previousSceneName);
            myText.text = "Insert Command Here";
        }
    }

    static mvCommandToPockets(
        input: string,
        scene: Scene,
        objectText: string,
        object: GameObjects.Text,
        myText: Phaser.GameObjects.Text,
        globalVar: string,
        globalVarInPockets: string,
    ) {
        if (input === "mv " + objectText + " pockets") {
            object.setActive(false);
            object.alpha = 0;
            scene.registry.set(globalVar, true);
            scene.registry.set(globalVarInPockets, true);
            myText.text = "Insert Command Here";
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
        objectGlobalVarInHand: string,
    ) {
        if (
            input === "mv " + objectText + " " + objectToInteract &&
            scene.registry.get(globalVar) &&
            scene.registry.get(objectGlobalVarInHand)
        ) {
            scene.registry.set(objectGlobalVar, true);
            background.setTexture(textureToLoad);
            myText.text = "Insert Command Here";
        }
    }

    static mvCommandItemToHand(
        input: string,
        hand: Hand,
        pockets: Pockets,
        scene: Scene,
        objectText: string,
        myText: Phaser.GameObjects.Text,
    ) {
        if (
            input === "mv " + objectText + " Hand" &&
            scene.registry.get("pocketsOpen")
        ) {
            hand.itemInHand(objectText, scene);
            pockets.closeInventory(scene, myText);
            myText.text = "Insert Command Here";
        } else if (input === "mv " + objectText + " pockets") {
            hand.hideItemInHand(objectText, scene);
            pockets.closeInventory(scene, myText);
            myText.text = "Insert Command Here";
        }
    }

    static checkCommandFound(myText: Phaser.GameObjects.Text) {
        if (
            myText.text !== "Insert Command Here" &&
            myText.text !== "Door Locked"
        ) {
            myText.text = "Command Not Found";
        }
    }

    static openInventory(
        input: string,
        pockets: Pockets,
        myText: Phaser.GameObjects.Text,
        scene: Scene,
    ) {
        if (input === "cd pockets" && !scene.registry.get("pocketsOpen")) {
            //pockets.openInventory(myText);
            pockets.openInventory(scene, myText);
            myText.text = "Insert Command Here";
        }
    }

    static closeInventory(
        input: string,
        pockets: Pockets,
        myText: Phaser.GameObjects.Text,
        scene: Scene,
    ) {
        if (input === "cd .." && scene.registry.get("pocketsOpen")) {
            pockets.closeInventory(scene, myText);
            myText.text = "Insert Command Here";
        }
    }

    constructor(scene: Phaser.Scene) {
        //super("Level1");
        this.scene = scene;
    }

    create() {
        EventBus.emit("current-scene-ready", this);
    }

    update() {
        //this.fpsText.update();
    }

    changeScene() {
        //this.scene.start("GameOver");
    }
}
