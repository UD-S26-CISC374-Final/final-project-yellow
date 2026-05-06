import { EventBus } from "./event-bus";
import { GameObjects, Scene } from "phaser";
import { Pockets } from "./Pockets";
import { Hand } from "./Hand";
import { Notes } from "./Notes";
//import TextBox from "phaser3-rex-plugins/templates/ui/textbox/TextBox";

//import PhaserLogo from "../objects/phaser-logo";
//import Text from "phaser3-rex-plugins/plugins/gameobjects/tagtext/textbase/Text";
//import FpsText from "../objects/fps-text";

export class CommandWriter {
    scene: Phaser.Scene;

    pockets!: Pockets;
    hand!: Hand;
    note!: Notes;
    //camera: Phaser.Cameras.Scene2D.Camera;
    //background: Phaser.GameObjects.Image;
    //phaserLogo: PhaserLogo;
    //fpsText: FpsText;

    myText!: Phaser.GameObjects.Text;

    //keyEnter = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    create() {
        EventBus.emit("current-scene-ready", this);
    }

    static lsCommand(
        input: string,
        myText: Phaser.GameObjects.Text,
        objectsToShow: GameObjects.Text[],
        hand: Hand,
        scene: Scene,
    ) {
        if (input === "ls" && !scene.registry.get("pocketsOpen")) {
            for (let i = 0; i < objectsToShow.length; i++) {
                objectsToShow[i].setActive(true).setVisible(true);
                hand.showInHandItem(scene);
            }
            myText.text = "Insert Command Here";
        }
    }

    static lsACommand(
        input: string,
        myText: Phaser.GameObjects.Text,
        objectsToShow: GameObjects.Text[],
        hand: Hand,
        scene: Scene,
    ) {
        if (scene.registry.get("lsACommandActive")) {
            if (input === "ls -a" && !scene.registry.get("pocketsOpen")) {
                for (let i = 0; i < objectsToShow.length; i++) {
                    objectsToShow[i].setActive(true).setVisible(true);
                    hand.showInHandItem(scene);

                    if (scene.sys.settings.key === "Skelly") {
                        scene.registry.set("Mask3InView", true);
                    } else if (scene.sys.settings.key === "Room5") {
                        scene.registry.set("Mask1InView", true);
                    } else if (scene.sys.settings.key === "Room7") {
                        scene.registry.set("Mask2InView", true);
                    } else if (scene.sys.settings.key === "Room10") {
                        scene.registry.set("Mask4InView", true);
                    }
                }
                myText.text = "Insert Command Here";
            }
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
            !scene.registry.get("pocketsOpen") &&
            !scene.registry.get("padCloseUp")
        ) {
            scene.sound.play("ChangeRoom", { volume: 0.5 });

            scene.scene.start(nextSceneName);
            myText.text = "Insert Command Here";
            /*
            const loopCount = 3;
            for (let i = 0; i < loopCount; i++) {
                scene.time.delayedCall(300 * i, () => {
                    scene.sound.play("ChangeRoom", { volume: 0.5 });
                });
            }

            scene.time.delayedCall(300 * loopCount, () => {
                scene.scene.start(nextSceneName);
                myText.text = "Insert Command Here";
            });
            */
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
            !scene.registry.get("pocketsOpen") &&
            !scene.registry.get("padCloseUp")
        ) {
            scene.sound.play("ChangeRoom", { volume: 0.5 });

            scene.scene.start(nextSceneName);
            myText.text = "Insert Command Here";

            /*
            const loopCount = 3;
            for (let i = 0; i < loopCount; i++) {
                scene.time.delayedCall(300 * i, () => {
                    scene.sound.play("ChangeRoom", { volume: 0.5 });
                });
            }

            scene.time.delayedCall(300 * loopCount, () => {
                scene.scene.start(nextSceneName);
                myText.text = "Insert Command Here";
            });
            */
        } else if (
            input === "cd " + sceneToChange &&
            !scene.registry.get(globalVar)
        ) {
            myText.text = "Door Locked";
            scene.sound.play("LockedDoor", { volume: 0.5 });
        }
    }

    static cdCommandNote(
        input: string,
        scene: Scene,
        notes: Notes,
        mytext: Phaser.GameObjects.Text,
        noteText: GameObjects.Text,
        noteInRoom: string,
    ) {
        if (input === "cd " + noteInRoom && !scene.registry.get("noteOpen")) {
            notes.openNote(noteInRoom, scene);
            noteText.setActive(true).setVisible(true);
            mytext.text = "Insert Command Here";
            if (noteInRoom === "WeirdNote" && !scene.registry.get("safeOpen")) {
                scene.registry.set("hasCode", true);
            }
        } else if (input === "cd .." && scene.registry.get("noteOpen")) {
            notes.closeNote(scene);
            noteText.setActive(false).setVisible(false);
            mytext.text = "Insert Command Here";
        }
    }

    static cdBack(
        input: string,
        scene: Scene,
        myText: Phaser.GameObjects.Text,
        //scenesAvailable: GameObjects.Text,
        previousSceneName: string,
    ) {
        if (
            input === "cd .." &&
            !scene.registry.get("pocketsOpen") &&
            !scene.registry.get("noteOpen") &&
            !scene.registry.get("bookCloseUp")
        ) {
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

            scene.game.sound.play("Skeleton", { volume: 0.8 });

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
        //objectText: string,
        objectItems: string[],
        myText: Phaser.GameObjects.Text,
    ) {
        const inputParts = input.split(" ");

        const command = inputParts[0];
        const object = inputParts[1];
        const destination = inputParts[2];

        if (command === "mv" && objectItems.includes(object)) {
            if (destination === "Hand" && scene.registry.get("pocketsOpen")) {
                hand.itemInHand(object, scene);
                pockets.closeInventory(scene, myText);
                myText.text = "Insert Command Here";
            } else if (destination === "pockets") {
                hand.hideItemInHand(object, scene);
                pockets.closeInventory(scene, myText);
                myText.text = "Insert Command Here";
            }
        }
    }

    static checkCommandFound(myText: Phaser.GameObjects.Text) {
        if (
            myText.text !== "Insert Command Here" &&
            myText.text !== "Door Locked" &&
            myText.text !== "mask piece inserted"
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

    update() {
        //this.fpsText.update();
    }

    changeScene() {
        //this.scene.start("GameOver");
    }
}
