//import { Scene } from "phaser";
import { EventBus } from "./event-bus";
import { Pockets } from "./Pockets";
//import { Scene } from "phaser";
//import TextBox from "phaser3-rex-plugins/templates/ui/textbox/TextBox";

//import PhaserLogo from "../objects/phaser-logo";
//import Text from "phaser3-rex-plugins/plugins/gameobjects/tagtext/textbase/Text";
//import FpsText from "../objects/fps-text";

export class Hand {
    scene: Phaser.Scene;

    pockets!: Pockets;

    //camera: Phaser.Cameras.Scene2D.Camera;
    //background: Phaser.GameObjects.Image;
    //phaserLogo: PhaserLogo;
    //fpsText: FpsText;

    handImage!: Phaser.GameObjects.Image;
    Key1!: Phaser.GameObjects.Image;

    //keyEnter = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    create() {
        this.handImage = this.scene.add.image(70, 530, "HandSlot");

        this.Key1 = this.scene.add.image(70, 530, "KeyTest");
        this.Key1.setScale(0.02, 0.02);

        //this.pocketsImage.setActive(false).setVisible(false);
        this.Key1.setActive(false).setVisible(false);

        EventBus.emit("current-scene-ready", this);
    }

    /*
    itemInHand(scene: Scene, myText: Phaser.GameObjects.Text) {
        //const pocketsImage = this.scene.add.image(200, 100, "logo");

        if (!scene.registry.get("pocketsOpen")) {
            //const pocketsImage = scene.add.image(200, 100, "logo");

            scene.registry.set("pocketsOpen", true);

            this.pocketsImage.setActive(true).setVisible(true);
            if (scene.registry.get("HasKey1")) {
                this.Key1.setActive(true).setVisible(true);
            }
        }

        myText.text = "Insert Command Here";
    }

    /*
    closeInventory(scene: Scene, myText: Phaser.GameObjects.Text) {
        if (scene.registry.get("pocketsOpen")) {
            scene.registry.set("pocketsOpen", false);

            this.pocketsImage.setActive(false).setVisible(false);
            this.Key1.setActive(false).setVisible(false);
        }

        myText.text = "Insert Command Here";
    }

    */
    update() {
        //this.fpsText.update();
    }

    changeScene() {
        //this.scene.start("GameOver");
    }
}
