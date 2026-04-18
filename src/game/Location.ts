import { Scene } from "phaser";

export class Location {
    scene: Scene;

    currentLocation: string;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    create() {
        this.scene.add.rectangle(400, 25, 800, 60, 0x000000, 1);
        this.scene.add.rectangle(400, 20, 780, 40, 0x373737, 1);

        const LocationText = this.scene.add.text(
            280,
            5,
            "Current Location: " + this.scene.scene.key,
            {
                fixedWidth: 300,
                fixedHeight: 36,
                backgroundColor: "#00000000",
                padding: { x: 9, y: 9.5 },
            },
        );
        LocationText.setActive(true);
    }
}
