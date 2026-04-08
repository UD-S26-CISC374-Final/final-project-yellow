import { Scene } from "phaser";
//import { EventBus } from "./event-bus";
import { Pockets } from "./Pockets";
import { Item } from "./Item";
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
    itemsTotal!: Item[];
    items!: Phaser.GameObjects.Image[];

    //keyEnter = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    create() {
        this.handImage = this.scene.add.image(70, 530, "HandSlot");

        this.items = [];

        this.itemsTotal = [
            {
                itemName: "Key",
                itemGlobalVar: "KeyTest",
                itemGlobalVarBool: false,
                itemInHand: false,
                itemImage: "KeyTest",
            },
        ];

        for (let i = 0; i < this.itemsTotal.length; i++) {
            this.items[i] = this.scene.add.image(
                70,
                530,
                this.itemsTotal[i].itemImage,
            );
            this.items[i].setScale(0.02, 0.02);

            this.items[i].setActive(false).setVisible(false);
        }

        /*
        this.Key1 = this.scene.add.image(70, 530, "KeyTest");
        this.Key1.setScale(0.02, 0.02);

        //this.pocketsImage.setActive(false).setVisible(false);
        this.Key1.setActive(false).setVisible(false);
        */

        //EventBus.emit("current-scene-ready", this);
    }

    itemInHand(name: string, scene: Scene) {
        for (let i = 0; i < this.itemsTotal.length; i++) {
            if (
                this.itemsTotal[i].itemName === name &&
                scene.registry.get("key1InPocket")
            ) {
                this.items[i].setActive(true).setVisible(true);
                scene.registry.set("key1InHand", true);
                scene.registry.set("key1InPocket", false);
            }
        }
    }

    hideItemInHand(name: string, scene: Scene) {
        for (let i = 0; i < this.itemsTotal.length; i++) {
            if (
                this.itemsTotal[i].itemName === name &&
                scene.registry.get("key1InHand")
            ) {
                this.items[i].setActive(false).setVisible(false);
                scene.registry.set("key1InHand", false);
                scene.registry.set("key1InPocket", true);
            }
        }
    }

    update() {
        //this.fpsText.update();
    }

    changeScene() {
        //this.scene.start("GameOver");
    }
}
