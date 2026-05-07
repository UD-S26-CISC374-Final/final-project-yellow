import { AUTO, Scene } from "phaser";
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

    itemsInPockets: string[];
    itemsInHand: string[];

    itemNamesHand: string[];

    itemInHandName: Phaser.GameObjects.Text;

    handPrompt: Phaser.GameObjects.Text;

    code!: Phaser.GameObjects.Text;

    //thereIsItemInHand: boolean;

    //keyEnter = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    create() {
        this.handPrompt = this.scene.add.text(35, 550, "Hand", {
            fixedWidth: 70,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
            align: "center",
        });
        this.handPrompt.setActive(false).setVisible(false);
        this.handPrompt.setDepth(1);

        this.itemNamesHand = [
            "Room4Key",
            "Room11Key",
            "SkellyKey",
            "MaskPiece1",
            "MaskPiece2",
            "MaskPiece3",
            "MaskPiece4",
        ];

        this.itemInHandName = this.scene.add.text(20, 450, "itemHeld", {
            fixedWidth: 100,
            fixedHeight: 24,
            backgroundColor: "#3898ff",
            padding: { x: 9, y: 4.5 },
        });
        this.itemInHandName.setActive(false).setVisible(false);

        this.itemsInPockets = this.scene.registry.get(
            "ItemsInPockets",
        ) as string[];
        this.itemsInHand = this.scene.registry.get("ItemsInHand") as string[];

        this.handImage = this.scene.add.image(70, 530, "HandSlot");
        this.handImage.setDepth(0);

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

        this.code = this.scene.add.text(
            375,
            550,
            this.scene.registry.get("code") as string,
            {
                fixedWidth: AUTO,
                fixedHeight: 36,
                backgroundColor: "#000000",
                padding: { x: 9, y: 9.5 },
            },
        );
        this.code.setOrigin(0.15, 0);
        this.code.setActive(false).setVisible(false);
        this.code.setDepth(1);

        if (this.scene.registry.get("hasCode")) {
            this.code.setActive(true).setVisible(true);
        }

        for (let i = 0; i < this.itemsTotal.length; i++) {
            this.items[i] = this.scene.add.image(
                70,
                530,
                this.itemsTotal[i].itemImage,
            );
            this.items[i].setScale(0.02, 0.02);

            this.items[i].setActive(false).setVisible(false);

            if (this.scene.registry.get(this.itemsInHand[i])) {
                this.items[i].setActive(true).setVisible(true);
            }
        }
    }

    itemInHand(name: string, scene: Scene) {
        /*
        for (let i = 0; i < this.itemsInHand.length; i++) {
            if (scene.registry.get(this.itemsInHand[i])) return;
        }
            */

        for (let j = 0; j < this.itemsTotal.length; j++) {
            if (scene.registry.get(this.itemsInHand[j])) {
                this.items[j].setActive(false).setVisible(false);
                scene.registry.set(this.itemsInHand[j], false);
                scene.registry.set(this.itemsInPockets[j], true);
            }
        }

        for (let i = 0; i < this.itemsTotal.length; i++) {
            if (
                this.itemsTotal[i].itemName === name &&
                //itemsInPockets[i] === this.itemsTotal[i].itemGlobalVarBool
                scene.registry.get(this.itemsInPockets[i])
                //!this.thereIsItemInHand
            ) {
                this.items[i].setActive(true).setVisible(true);
                scene.registry.set(this.itemsInHand[i], true);
                scene.registry.set(this.itemsInPockets[i], false);
                if (this.itemInHandName.active) {
                    this.itemInHandName.text = this.itemNamesHand[i];
                }
                //this.thereIsItemInHand = true;
            }
        }
    }

    hideItemInHand(name: string, scene: Scene) {
        for (let i = 0; i < this.itemsTotal.length; i++) {
            if (
                this.itemsTotal[i].itemName === name &&
                scene.registry.get(this.itemsInHand[i])
            ) {
                this.items[i].setActive(false).setVisible(false);
                this.itemInHandName.setActive(false).setVisible(false);
                scene.registry.set(this.itemsInHand[i], false);
                scene.registry.set(this.itemsInPockets[i], true);
                //this.thereIsItemInHand = false;
            }
        }
    }

    showInHandItem(scene: Scene) {
        for (let i = 0; i < this.itemsTotal.length; i++) {
            if (scene.registry.get(this.itemsInHand[i])) {
                this.itemInHandName.setActive(true).setVisible(true);
                this.itemInHandName.text = this.itemNamesHand[i];
            }
        }
    }

    update() {
        if (!this.scene.registry.get("hasCode")) {
            console.log("deactivate code");
            this.code.setActive(false).setVisible(false);
        }
    }

    changeScene() {
        //this.scene.start("GameOver");
    }
}
