export interface ChangeableScene {
    changeScene: () => void;
    moveSprite?: (
        callback: ({ x, y }: { x: number; y: number }) => void,
    ) => void;
}
