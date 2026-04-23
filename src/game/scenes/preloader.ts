import { Scene } from "phaser";

export class Preloader extends Scene {
    constructor() {
        super("Preloader");
    }

    init() {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, "background");

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on("progress", (progress: number) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + 460 * progress;
        });
    }

    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath("assets");

        this.load.image("logo", "logo.png");
        this.load.image("star", "star.png");
        this.load.image("phaser-logo", "phaser-logo.png");
        this.load.image("room1", "room1.png");
        this.load.image("room3", "room3.png");
        this.load.image("room4", "room4.png");
        this.load.image("level1", "level1.png");
        this.load.image("level1locked", "level1locked.png");
        this.load.image("OnlyDoorLeft", "OnlyDoorLeft.png");
        this.load.image("DoorOnlyFront", "DoorOnlyFront.png");
        this.load.image("RoomEnd", "RoomEnd.png");
        this.load.image("Inventory", "Inventory.png");
        this.load.image("KeyTest", "KeyTest.png");
        this.load.image("HandSlot", "HandSlot.png");
        this.load.image("Key2", "Key2.png");
        this.load.image("TutorialSafeClosed", "TutorialSafeClosed.png");
        this.load.image("TutorialSafeOpen", "TutorialSafeOpen.png");
        this.load.image("roomRightOpen", "roomRightOpen.png");
        this.load.image("skellyKey", "skellyKey.png");

        this.load.image("MaskPiece1", "MaskPiece1.png");
        this.load.image("MaskPiece2", "MaskPiece2.png");
        this.load.image("MaskPiece3", "MaskPiece3.png");
        this.load.image("MaskPiece4", "MaskPiece4.png");

        this.load.image("SkellyTalk", "SkellyTalk.jpg");
        this.load.image("SkellyTalk2", "SkellyTalk2.jpg");

        this.load.audio("ChangeRoom", "ChangeRoom.wav");
        this.load.audio("IntroCutscene", "IntroCutscene.wav");
        this.load.audio("Skeleton", "Skeleton.wav");
        this.load.audio("Skeleton2", "Skeleton2.wav");

        this.load.image("PadLock", "PadLock.png");
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start("MainMenu");
    }
}
