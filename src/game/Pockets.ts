import { Scene } from "phaser";
import { EventBus } from "./event-bus";
import { Item } from "./Item";
//import { Scene } from "phaser";
//import TextBox from "phaser3-rex-plugins/templates/ui/textbox/TextBox";

//import PhaserLogo from "../objects/phaser-logo";
//import Text from "phaser3-rex-plugins/plugins/gameobjects/tagtext/textbase/Text";
//import FpsText from "../objects/fps-text";

export class Pockets {
    scene: Phaser.Scene;

    //camera: Phaser.Cameras.Scene2D.Camera;
    //background: Phaser.GameObjects.Image;
    //phaserLogo: PhaserLogo;
    //fpsText: FpsText;

    pocketsImage!: Phaser.GameObjects.Image;
    Key1!: Phaser.GameObjects.Image;
    itemsTotal!: Item[];
    items!: Phaser.GameObjects.Image[];

    //keyEnter = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    create() {
        this.pocketsImage = this.scene.add.image(400, 330, "Inventory");

        this.itemsTotal = [
            {
                itemName: "Key1",
                itemGlobalVar: "KeyTest",
                itemGlobalVarBool: false,
                itemInHand: false,
                itemImage: "KeyTest",
            },
        ];

        for (let i = 0; i < this.items.length; i++) {
            this.items[i] = this.scene.add.image(
                225,
                135,
                this.itemsTotal[i].itemImage,
            );
            this.items[i].setScale(0.02, 0.02);

            this.items[i].setActive(false).setVisible(false);
        }

        /*
        this.Key1 = this.scene.add.image(225, 135, "KeyTest");
        this.Key1.setScale(0.02, 0.02);
        */

        this.pocketsImage.setActive(false).setVisible(false);
        //this.Key1.setActive(false).setVisible(false);

        EventBus.emit("current-scene-ready", this);
    }

    openInventory(scene: Scene, myText: Phaser.GameObjects.Text) {
        //const pocketsImage = this.scene.add.image(200, 100, "logo");

        if (!scene.registry.get("pocketsOpen")) {
            //const pocketsImage = scene.add.image(200, 100, "logo");

            scene.registry.set("pocketsOpen", true);

            this.pocketsImage.setActive(true).setVisible(true);

            /*
            if (scene.registry.get("HasKey1")) {
                this.Key1.setActive(true).setVisible(true);
            }
                */

            for (let i = 0; i < this.itemsTotal.length; i++) {
                if (
                    //this.itemsTotal[i].itemName === name &&
                    scene.registry.get("key1InHand")
                ) {
                    this.items[i].setActive(true).setVisible(true);
                }
            }
        }

        myText.text = "Insert Command Here";
    }

    closeInventory(scene: Scene, myText: Phaser.GameObjects.Text) {
        if (scene.registry.get("pocketsOpen")) {
            scene.registry.set("pocketsOpen", false);

            this.pocketsImage.setActive(false).setVisible(false);
            this.Key1.setActive(false).setVisible(false);
        }

        myText.text = "Insert Command Here";
    }

    update() {
        //this.fpsText.update();
    }

    changeScene() {
        //this.scene.start("GameOver");
    }
}
