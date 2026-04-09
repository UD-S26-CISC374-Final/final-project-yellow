import { Scene } from "phaser";
import { NotesClass } from "./NotesClass";

export class Notes {
    scene: Phaser.Scene;

    notesNames!: NotesClass[];

    notesImages!: Phaser.GameObjects.Image[];

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    create() {
        //this.notesNames = this.scene.registry.get("notes") as string[];

        this.notesImages = [];

        this.notesNames = [
            { noteName: "WeirdNote", noteOpen: false, noteImage: "Inventory" },
        ];

        for (let i = 0; i < this.notesNames.length; i++) {
            this.notesImages[i] = this.scene.add.image(
                400,
                330,
                this.notesNames[i].noteImage,
            );

            this.notesImages[i].setScale(0.8, 0.8);

            this.notesImages[i].setActive(false).setVisible(false);
        }
    }

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
}
