import { Scene } from "phaser";

export class Safe {
    scene: Phaser.Scene;

    //safeImage: Phaser.GameObjects.Image;
    //safeOpenImage: Phaser.GameObjects.Image;

    padLock: Phaser.GameObjects.Image;

    indications: Phaser.GameObjects.Text;

    codeToUnlock: number;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    create() {
        //this.safeImage = this.scene.add.image(400, 330, "TutorialSafeClosed");
        //this.safeOpenImage = this.scene.add.image(400, 330, "TutorialSafeOpen");

        this.padLock = this.scene.add.image(400, 330, "PadLock");

        this.codeToUnlock = this.scene.registry.get("code") as number;

        this.indications = this.scene.add.text(
            150,
            300,
            "Please enter the code",
            {
                fixedWidth: 650,
                backgroundColor: "#000000",
                padding: { x: 9, y: 9.5 },
                wordWrap: { width: 640 },
            },
        );
        this.indications.setActive(false).setVisible(false);
        this.padLock.setActive(false).setVisible(false);
    }

    padlockCloseUp(
        input: string,
        scene: Scene,
        myText: Phaser.GameObjects.Text,
        //background: Phaser.GameObjects.Image,
    ) {
        if (input === "cd Safe" && !scene.registry.get("padCloseUp")) {
            scene.registry.set("padCloseUp", true);
            this.padLock.setActive(true).setVisible(true);
            this.indications.setActive(true).setVisible(true);
        } else if (input === "cd .." && scene.registry.get("padCloseUp")) {
            scene.registry.set("padCloseUp", false);
            this.padLock.setActive(false).setVisible(false);
            this.indications.setActive(false).setVisible(false);
        }
        myText.text = "Insert Command Here";
    }

    enterCode(
        input: string,
        scene: Scene,
        myText: Phaser.GameObjects.Text,
        background: Phaser.GameObjects.Image,
    ) {
        if (
            input === scene.registry.get("code") &&
            !scene.registry.get("safeOpen")
        ) {
            this.padLock.setActive(false).setVisible(false);
            this.indications.setActive(false).setVisible(false);
            background.setTexture("TutorialSafeOpen");
            scene.registry.set("safeOpen", true);
        }

        myText.text = "Insert Command Here";
    }

    /*
    openNote(name: string, scene: Scene) {
        //const pocketsImage = this.scene.add.image(200, 100, "logo");

        if (!scene.registry.get("noteOpen")) {
            //const pocketsImage = scene.add.image(200, 100, "logo");

            scene.registry.set("noteOpen", true);

            for (let i = 0; i < this.notesNames.length; i++) {
                if (this.notesNames[i].noteName === name) {
                    this.notesImages[i].setActive(true).setVisible(true);
                }
            }
        }
    }

    closeNote(scene: Scene) {
        if (scene.registry.get("noteOpen")) {
            scene.registry.set("noteOpen", false);

            for (let i = 0; i < this.notesNames.length; i++) {
                this.notesImages[i].setActive(false).setVisible(false);
            }
        }
    }

    update() {
        //this.fpsText.update();
    }

    changeScene() {
        //this.scene.start("GameOver");
    }
        */
}
