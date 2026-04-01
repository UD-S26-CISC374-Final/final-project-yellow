import { EventBus } from "../event-bus";
import { Scene } from "phaser";

import PhaserLogo from "../objects/phaser-logo";
//import Text from "phaser3-rex-plugins/plugins/gameobjects/tagtext/textbase/Text";
//import FpsText from "../objects/fps-text";

export class Level1 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    //fpsText: FpsText;

    //keyEnter = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    constructor() {
        super("Level1");
    }

    create() {    
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha(0.5);
        
        const mySprite = this.add.sprite(200, 100, "star");
        mySprite.setActive(false);
        mySprite.alpha = 0;

        const myText = this.add.text(400, 300, 'Insert Command Here', 
            { fixedWidth: 200, fixedHeight: 36, backgroundColor: "#000000", 
                padding: {x: 9, y: 9.5}})
            myText.setOrigin(0.15, 0)

            myText.setInteractive().on('pointerdown', () => {
                this.rexUI.edit(myText, {
                    onClose: () => {
                        if(myText.text === "cd Room1" && mySprite.active){
                            this.scene.start("GameOver");
                        } else if(myText.text === "ls" && !mySprite.active){
                            mySprite.setActive(true);
                            mySprite.alpha = 1;
                        } else if(myText.text == "cd .."){
                            this.scene.start("MainMenu");
                        }
                    }
                })
        })

        


        

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
