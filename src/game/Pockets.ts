import { Scene } from "phaser";
//import { EventBus } from "./event-bus";
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
    //Key1!: Phaser.GameObjects.Image;
    itemsTotal!: Item[];
    items!: Phaser.GameObjects.Image[];

    itemsInPockets: string[];
    itemsInHand: string[];

    itemNames: Phaser.GameObjects.Text[];

    pocketsIndicator: Phaser.GameObjects.Text;

    //imagePositionX: number[];

    //keyEnter = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    create() {
        this.pocketsIndicator = this.scene.add.text(680, 550, "pockets", {
            fixedWidth: 90,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
            align: "center",
        });
        this.pocketsIndicator.setActive(false).setVisible(false);

        this.itemsInPockets = this.scene.registry.get(
            "ItemsInPockets",
        ) as string[];
        this.itemsInHand = this.scene.registry.get("ItemsInHand") as string[];

        this.pocketsImage = this.scene.add.image(400, 330, "Inventory");

        this.itemNames = [];

        this.items = [];

        this.itemsTotal = [
            {
                itemName: "Room4Key",
                itemGlobalVar: "HasRoom4Key",
                itemGlobalVarBool: "Room4KeyInPocket",
                itemInHand: "Room4KeyInHand",
                itemImage: "KeyTest",
            },
            {
                itemName: "Room11Key",
                itemGlobalVar: "HasRoom11Key",
                itemGlobalVarBool: "Room11KeyInPocket",
                itemInHand: "Room11KeyInHand",
                itemImage: "Key2",
            },
            {
                itemName: "SkellyKey",
                itemGlobalVar: "HasSkellyKey",
                itemGlobalVarBool: "SkellyKeyInPocket",
                itemInHand: "SkellyKeyInHand",
                itemImage: "skellyKey",
            },
            {
                itemName: "MaskPiece1",
                itemGlobalVar: "HasMaskPiece1",
                itemGlobalVarBool: "MaskPiece1InPocket",
                itemInHand: "MaskPiece1InHand",
                itemImage: "MaskPiece1",
            },
            {
                itemName: "MaskPiece2",
                itemGlobalVar: "HasMaskPiece2",
                itemGlobalVarBool: "MaskPiece2InPocket",
                itemInHand: "MaskPiece2InHand",
                itemImage: "MaskPiece2",
            },
            {
                itemName: "MaskPiece3",
                itemGlobalVar: "HasMaskPiece3",
                itemGlobalVarBool: "MaskPiece3InPocket",
                itemInHand: "MaskPiece3InHand",
                itemImage: "MaskPiece3",
            },
            {
                itemName: "MaskPiece4",
                itemGlobalVar: "HasMaskPiece4",
                itemGlobalVarBool: "MaskPiece4InPocket",
                itemInHand: "MaskPiece4InHand",
                itemImage: "MaskPiece4",
            },
        ];

        for (let i = 0; i < this.itemsTotal.length; i++) {
            this.items[i] = this.scene.add.image(
                225,
                135,
                this.itemsTotal[i].itemImage,
            );
            this.items[i].setScale(0.02, 0.02);

            this.items[i].setActive(false).setVisible(false);

            this.itemNames[i] = this.scene.add.text(
                70,
                200,
                this.itemsTotal[i].itemName,
                {
                    fixedWidth: 110,
                    fixedHeight: 36,
                    backgroundColor: "#000000",
                    padding: { x: 9, y: 9.5 },
                },
            );

            this.itemNames[i].setActive(false).setVisible(false);
        }

        /*
        this.Key1 = this.scene.add.image(225, 135, "KeyTest");
        this.Key1.setScale(0.02, 0.02);
        */

        this.pocketsImage.setActive(false).setVisible(false);
        //this.Key1.setActive(false).setVisible(false);

        //EventBus.emit("current-scene-ready", this);
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
                    scene.registry.get(this.itemsInPockets[i])
                ) {
                    this.items[i].setActive(true).setVisible(true);
                    this.itemNames[i].setActive(true).setVisible(true);

                    if (i === 0) {
                        this.items[i].x = 225;
                        this.items[i].y = 135;

                        this.itemNames[i].x = 180;
                        this.itemNames[i].y = 170;
                    } else if (i === 1) {
                        this.items[i].x = 385;
                        this.items[i].y = 135;

                        this.itemNames[i].x = 345;
                        this.itemNames[i].y = 170;
                    } else if (i === 2) {
                        this.items[i].x = 545;
                        this.items[i].y = 135;

                        this.itemNames[i].x = 510;
                        this.itemNames[i].y = 170;
                    } else if (i === 3) {
                        this.items[i].x = 225;
                        this.items[i].y = 220;

                        this.itemNames[i].x = 180;
                        this.itemNames[i].y = 220;
                    } else if (i === 4) {
                        this.items[i].x = 385;
                        this.items[i].y = 220;

                        this.itemNames[i].x = 345;
                        this.itemNames[i].y = 220;
                    } else if (i === 5) {
                        this.items[i].x = 545;
                        this.items[i].y = 220;

                        this.itemNames[i].x = 510;
                        this.itemNames[i].y = 220;
                    } else if (i === 6) {
                        this.items[i].x = 225;
                        this.items[i].y = 350;

                        this.itemNames[i].x = 180;
                        this.itemNames[i].y = 400;
                    }

                    //Hardcodear cada posicion
                }
            }
        }

        myText.text = "Insert Command Here";
    }

    closeInventory(scene: Scene, myText: Phaser.GameObjects.Text) {
        if (scene.registry.get("pocketsOpen")) {
            scene.registry.set("pocketsOpen", false);

            this.pocketsImage.setActive(false).setVisible(false);

            for (let i = 0; i < this.itemsTotal.length; i++) {
                this.items[i].setActive(false).setVisible(false);
                this.itemNames[i].setActive(false).setVisible(false);
            }
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
