import Phaser from "phaser";
import type { RefObject } from "react";
import { useEffect, useLayoutEffect, useRef } from "react";
import StartGame from "./game/main";
import { EventBus } from "./game/event-bus";

export interface IRefPhaserGame {
    game: Phaser.Game | null;
    scene: Phaser.Scene | null;
}

interface IProps {
    onCurrentActiveSceneChange?: (scene_instance: Phaser.Scene) => void;
    ref?: RefObject<IRefPhaserGame | null>;
}

/**
 * PhaserGame component that initializes the Phaser game instance
 * and provides a reference to the game and current scene.
 * This component uses React's forwardRef to expose the game and scene
 * to parent components.
 * This is also where the EventBus listens for scene changes and updates
 * the ref accordingly.
 * You will most likely not need to modify this component, unless you
 * want to tweak the React/Phaser integration.
 */
export const PhaserGame = function PhaserGame({
    onCurrentActiveSceneChange,
    ref,
}: IProps) {
    const game = useRef<Phaser.Game | null>(null);

    useLayoutEffect(() => {
        // Initialize the Phaser game only once
        if (game.current === null) {
            game.current = StartGame("game-container");

            if (ref) {
                ref.current = { game: game.current, scene: null };
            }
        }

        // Destroy the game on unmount
        return () => {
            if (game.current) {
                game.current.destroy(true);
                game.current = null;
            }
        };
    }, [ref]);

    useEffect(() => {
        EventBus.on("current-scene-ready", (scene_instance: Phaser.Scene) => {
            if (
                onCurrentActiveSceneChange &&
                typeof onCurrentActiveSceneChange === "function"
            ) {
                onCurrentActiveSceneChange(scene_instance);
            }

            if (ref) {
                ref.current = {
                    game: game.current,
                    scene: scene_instance,
                };
            }
        });
        return () => {
            EventBus.removeListener("current-scene-ready");
        };
    }, [onCurrentActiveSceneChange, ref]);

    return <div id="game-container"></div>;
};
