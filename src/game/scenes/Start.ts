import { EventBus } from "../event-bus";
import { AUTO, Scene } from "phaser";
import PhaserLogo from "../objects/phaser-logo";
import { CommandWriter } from "../CommandWriter";
import { Pockets } from "../Pockets";
import { Hand } from "../Hand";
import { Safe } from "../Safe";
import { Location } from "../Location";

export class Start extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    phaserLogo: PhaserLogo;
    pockets!: Pockets;
    hand!: Hand;
    safe!: Safe;
    location!: Location;

    frameCounter!: number;

    constructor() {
        super("Start");
    }

    create() {
        //this.cameras.main.resetFX();
        if (!this.registry.get("removeFadeIn")) {
            this.cameras.main.fadeIn(1000, 0, 0, 0);

            this.time.delayedCall(150, () =>
                this.registry.set("removeFadeIn", true),
            );
        }

        this.background = this.add.image(400, 300, "Tutorial1SafeClosed");
        if (this.registry.get("safeOpen")) {
            this.background = this.add.image(400, 300, "Tutorial2SafeOpen");
        }
        this.background.setDisplaySize(this.scale.width, this.scale.height);

        this.frameCounter = 0;

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        const KeyObject = this.add.text(620, 400, "Room11Key", {
            fixedWidth: AUTO,
            fixedHeight: 36,
            backgroundColor: "#3898ff",
            padding: { x: 9, y: 9.5 },
        });
        KeyObject.setOrigin(0.15, 0);
        KeyObject.setActive(false);
        KeyObject.alpha = 0;

        const safe = this.add.text(580, 260, "Safe", {
            fixedWidth: AUTO,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        safe.setOrigin(0.15, 0);
        safe.setActive(false).setVisible(false);

        const cdRoom1 = this.add.text(370, 190, "Room1", {
            fixedWidth: AUTO,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        cdRoom1.setOrigin(0.15, 0);
        cdRoom1.setActive(false).setVisible(false);

        const myText = this.add.text(330, 500, "Insert Command Here", {
            fixedWidth: 200,
            fixedHeight: 36,
            backgroundColor: "#000000",
            padding: { x: 9, y: 9.5 },
        });
        myText.setOrigin(0.15, 0);

        const TutorialText = this.add.text(
            150,
            300,
            "Where to go? Where to go? You might need to look around, to see if there's anything that might help you. Try typing 'ls' on that small box down there.",
            {
                fixedWidth: 650,
                backgroundColor: "#000000",
                padding: { x: 9, y: 9.5 },
                wordWrap: { width: 640 },
            },
        );
        TutorialText.setOrigin(0.15, 0);
        if (this.registry.get("Tutorial") === false) {
            TutorialText.setActive(false);
            TutorialText.alpha = 0;
        }

        this.registry.set("CommandFound", false);

        this.input.keyboard!.on("keydown", (event: KeyboardEvent) => {
            if (
                event.key !== "Enter" &&
                (myText.text === "Insert Command Here" ||
                    myText.text === "Command Not Found" ||
                    myText.text === "Door Locked")
            ) {
                myText.text = "";
            }
            if (cdRoom1.active && this.registry.get("Tutorial") === true) {
                TutorialText.text =
                    "Great. Now we can see a door. Seems to be the only way to go. Ususally you wouldn't explore an abandoned dungeon, but its not like there's other choices. Move to the door using the 'cd' command, and a space alongside the name of the door.";
            }
            this.rexUI.edit(myText, {
                onClose: () => {
                    const input = myText.text;

                    if (
                        myText.text === "ls" &&
                        !KeyObject.active &&
                        !this.registry.get("HasRoom11Key") &&
                        this.registry.get("safeOpen")
                    ) {
                        KeyObject.setActive(true);
                        KeyObject.alpha = 1;
                        myText.text = "Insert Command Here";
                    } else if (
                        (myText.text === "ls" && KeyObject.active) ||
                        (myText.text === "ls" &&
                            this.registry.get("HasRoom11Key"))
                    ) {
                        myText.text = "Insert Command Here";
                    }

                    CommandWriter.openInventory(
                        input,
                        this.pockets,
                        myText,
                        this,
                    );

                    CommandWriter.closeInventory(
                        input,
                        this.pockets,
                        myText,
                        this,
                    );

                    CommandWriter.mvCommandToObject(
                        input,
                        this,
                        "Key",
                        this.background,
                        cdRoom1.text,
                        "Room1",
                        myText,
                        "HasKey1",
                        "Room4Open",
                        "key1InHand",
                    );
                    CommandWriter.lsCommand(
                        input,
                        myText,
                        [
                            cdRoom1,
                            safe,
                            this.pockets.pocketsIndicator,
                            this.hand.handPrompt,
                        ],
                        this.hand,
                        this,
                    );

                    CommandWriter.lsACommand(
                        input,
                        myText,
                        [
                            cdRoom1,
                            safe,
                            this.pockets.pocketsIndicator,
                            this.hand.handPrompt,
                        ],
                        this.hand,
                        this,
                    );

                    CommandWriter.mvCommandToPockets(
                        input,
                        this,
                        KeyObject.text,
                        KeyObject,
                        myText,
                        "HasRoom11Key",
                        "Room11KeyInPocket",
                    );

                    CommandWriter.cdCommand(
                        input,
                        this,
                        myText,
                        cdRoom1.text,
                        "Room1",
                    );

                    CommandWriter.mvCommandItemToHand(
                        input,
                        this.hand,
                        this.pockets,
                        this,
                        this.registry.get("ItemsNames") as string[],
                        myText,
                    );

                    this.safe.padlockCloseUp(input, this, myText);
                    this.safe.enterCode(
                        input,
                        this,
                        myText,
                        this.background,
                        safe,
                    );

                    CommandWriter.checkCommandFound(myText);
                },
            });
        });

        this.pockets = new Pockets(this);
        this.pockets.create();

        this.hand = new Hand(this);
        this.hand.create();

        this.safe = new Safe(this);
        this.safe.create();

        this.location = new Location(this);
        this.location.create();

        EventBus.emit("current-scene-ready", this);
    }

    update(): void {
        this.frameCounter++;

        if (!this.registry.get("safeOpen")) {
            if (this.frameCounter === 30) {
                const newBg =
                    this.background.texture.key === "Tutorial1-2SafeClosed" ?
                        "Tutorial1SafeClosed"
                    :   "Tutorial1-2SafeClosed";

                this.background.setTexture(newBg);

                this.frameCounter = 0;
            }
        } else {
            if (this.frameCounter === 30) {
                const newBg =
                    this.background.texture.key === "Tutorial2-2SafeOpen" ?
                        "Tutorial2SafeOpen"
                    :   "Tutorial2-2SafeOpen";

                this.background.setTexture(newBg);

                this.frameCounter = 0;
            }
        }
    }
}
