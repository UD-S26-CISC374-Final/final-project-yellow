import { Scene } from "phaser";

export class Preloader extends Scene {
    fontReady!: Promise<FontFaceSet>;

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

        const font = new FontFace("Architext", "url(assets/Architext.ttf)");

        this.fontReady = font.load().then((loadedFont) => {
            document.fonts.add(loadedFont);
            return document.fonts.ready;
        });

        this.load.image("logo", "logo.png");
        this.load.image("star", "star.png");
        this.load.image("phaser-logo", "phaser-logo.png");

        this.load.image("room1", "room1.png");
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

        this.load.image("Tutorial1-2SafeClosed", "Tutorial1-2SafeClosed.png");
        this.load.image("Tutorial1SafeClosed", "Tutorial1SafeClosed.png");
        this.load.image("Tutorial2-2SafeOpen", "Tutorial2-2SafeOpen.png");
        this.load.image("Tutorial2SafeOpen", "Tutorial2SafeOpen.png");

        this.load.audio("ChangeRoom", "ChangeRoom.wav");
        this.load.audio("IntroCutscene", "IntroCutscene.wav");
        this.load.audio("Skeleton", "Skeleton.wav");
        this.load.audio("Skeleton2", "Skeleton2.wav");

        this.load.image("MaskPiece1", "MaskPiece1.png");
        this.load.image("MaskPiece2", "MaskPiece2.png");
        this.load.image("MaskPiece3", "MaskPiece3.png");
        this.load.image("MaskPiece4", "MaskPiece4.png");

        this.load.image("SkellyTalk1", "SkellyTalk1.png");
        this.load.image("SkellyTalk2", "SkellyTalk2.png");

        this.load.audio("Sans", "Sans.mp3");

        this.load.audio("LockedDoor", "LockedDoor.wav");

        this.load.image("PadLock", "PadLock.png");

        ////////////////////////////////////////////////
        this.load.setPath("assets/ImagesForGame");

        this.load.image("Room1Open", "Room1Open.png");
        this.load.image("Room1Closed", "Room1Closed.png");

        this.load.image("Room2Open", "Room2Open.png");
        this.load.image("Room2Closed", "Room2Closed.png");

        this.load.image("Skelly1_1NoMask", "Skelly1_1NoMask.png");
        this.load.image("Skelly1_2NoMask", "Skelly1_2NoMask.png");
        this.load.image("Skelly2_1Mask", "Skelly2_1Mask.png");
        this.load.image("Skelly2_2Mask", "Skelly2_2Mask.png");

        this.load.image("Room4_1", "Room4_1.png");
        this.load.image("Room4_2", "Room4_2.png");

        this.load.image("Room5Mask", "Room5Mask.png");
        this.load.image("Room5NoMask", "Room5NoMask.png");

        this.load.image("Room6", "Room6.png");

        this.load.image("Room8", "Room8.png");
        this.load.image("Room8_2", "Room8_2.png");

        this.load.image("Room9_1", "Room9_1.png");
        this.load.image("Room9_2", "Room9_2.png");
        this.load.image("Room9_2Closed", "Room9_2Closed.png");
        this.load.image("Room9_Closed", "Room9_Closed.png");

        this.load.image("Room10_1Mask", "Room10_1Mask.png");
        this.load.image("Room10_1NoMask", "Room10_1NoMask.png");
        this.load.image("Room10_2Mask", "Room10_2Mask.png");
        this.load.image("Room10_2NoMask", "Room10_2NoMask.png");

        this.load.image("Room11", "Room11.png");

        /////////////////////////////////////////////////
        this.load.setPath("assets/ImagesForGame2");

        this.load.image("Room3Key", "Room3Key.png");
        this.load.image("Room3NoKey", "Room3NoKey.png");

        this.load.image("Room7_1Mask", "Room7_1Mask.png");
        this.load.image("Room7_1NoMask", "Room7_1NoMask.png");
        this.load.image("Room7_2Mask", "Room7_2Mask.png");
        this.load.image("Room7_2NoMask", "Room7_2NoMask.png");

        this.load.image("Room12_1", "Room12_1.png");
        this.load.image("Room12_2", "Room12_2.png");

        this.load.image("Room12_1AllMasks", "Room12_1AllMasks.png");
        this.load.image("Room12_2AllMasks", "Room12_2AllMasks.png");
        this.load.image("Room12_1Key", "Room12_1Key.png");
        this.load.image("Room12_2Key", "Room12_2Key.png");
        this.load.image("Room12_1NoMasks", "Room12_1NoMasks.png");
        this.load.image("Room12_2NoMasks", "Room12_2NoMasks.png");
        this.load.image("Room12_1OneMasks", "Room12_1OneMasks.png");
        this.load.image("Room12_2OneMasks", "Room12_2OneMasks.png");
        this.load.image("Room12_1ThreeMasks", "Room12_1ThreeMasks.png");
        this.load.image("Room12_2ThreeMasks", "Room12_2ThreeMasks.png");
        this.load.image("Room12_1TwoMasks", "Room12_1TwoMasks.png");
        this.load.image("Room12_2TwoMasks", "Room12_2TwoMasks.png");

        this.load.image("FinalCutscene1_1", "FinalCutscene1_1.png");
        this.load.image("FinalCutscene1_2", "FinalCutscene1_2.png");
        this.load.image(
            "FinalCutscene2_PostBart",
            "FinalCutscene2_PostBart.png",
        );
        this.load.image("FinalCutscene2_PreBart", "FinalCutscene2_PreBart.png");

        this.load.image("Note", "Note.png");

        ////////////////////////////////////////////////
        this.load.setPath("assets/Items");

        this.load.image("Mask1", "Mask1.png");
        this.load.image("Mask2", "Mask1.png");
        this.load.image("Mask3", "Mask1.png");
        this.load.image("Mask4", "Mask1.png");

        this.load.image("Room4Key", "Room4Key.png");
        this.load.image("Room11Key", "Room11Key.png");
        this.load.image("SkellyKey", "SkellyKey.png");

        this.load.image("Bart", "Bart.png");

        ////////////////////////////////////////////////
        this.load.setPath("assets/MaskTalk");

        this.load.image("MaskNoTalk", "MaskNoTalk.png");
        this.load.image("MaskTalks1", "MaskTalks1.png");
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.fontReady
            .then(() => {
                this.scene.start("MainMenu");
            })
            .catch((err) => {
                console.error("Font failed:", err);
                this.scene.start("MainMenu");
            });
    }
}
