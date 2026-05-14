import { Scene } from "phaser";

export function RecurrentConstants(scene: Scene) {
    const helpText = scene.add.text(
        405,
        315,
        "List of Commands:\ncd + <black text>: Move between rooms, check notes, or chat with npcs.\nmv + <object name> + <destination>: Take a blue object and put it either in you hand or in your pockets.\nls: Check the room you are currently in.",
        {
            fixedWidth: 320,
            //fixedHeight: 36,
            backgroundColor: "#00000000",
            color: "#000000",
            fontFamily: "Architext",
            fontSize: 24,
            padding: { x: 9, y: 9.5 },
            lineSpacing: 12,
            wordWrap: { width: 310 },
        },
    );
    helpText.setName("helpText");
    helpText.setOrigin(0.5, 0.5);
    helpText.setActive(false).setVisible(false);
    helpText.setDepth(2);

    const helpImage = scene.add.image(400, 320, "Note");
    helpImage.setName("helpImage");
    helpImage.setScale(0.4, 0.4);
    helpImage.setActive(false).setVisible(false);
    helpImage.setDepth(1);

    scene.data.set("helpText", helpText);
    scene.data.set("helpImage", helpImage);

    const seeObjectives = scene.add.text(
        405,
        315,
        "Objectives:\nFind a way to escape",
        {
            fixedWidth: 320,
            //fixedHeight: 36,
            backgroundColor: "#00000000",
            color: "#000000",
            fontFamily: "Architext",
            fontSize: 24,
            padding: { x: 9, y: 9.5 },
            lineSpacing: 12,
            wordWrap: { width: 310 },
        },
    );
    seeObjectives.setName("objectiveText");
    seeObjectives.setOrigin(0.5, 0.5);
    seeObjectives.setActive(false).setVisible(false);
    seeObjectives.setDepth(2);

    const objImage = scene.add.image(400, 320, "Note");
    objImage.setName("objectiveImage");
    objImage.setScale(0.4, 0.4);
    objImage.setActive(false).setVisible(false);
    objImage.setDepth(1);

    scene.data.set("objectiveText", seeObjectives);
    scene.data.set("objectiveImage", objImage);
}
