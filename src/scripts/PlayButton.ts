import * as PIXI from 'pixi.js';

export interface PlayButton {
    container: PIXI.Container,
    applyReadySkin: () => void,
    applySpinningSkin: () => void,
    applyHoverSkin: () => void
}

export const createPlayButton: (buttonWitdh: number, buttonHeight:number) => PlayButton  = (buttonWitdh: number, buttonHeight:number) => {
    const background: PIXI.Graphics = new PIXI.Graphics();
    const readyColor:number = 0x2ecc71;
    const disableColor:number = 0x566573;
    const hoverColor:number =  0xf4d03f ;

    background.beginFill(readyColor);
    background.drawRect(0, 0, buttonWitdh, buttonHeight);
    background.endFill();

    const text: PIXI.Text = new PIXI.Text();
    text.anchor.set(0.5);
    text.x = buttonWitdh/2;
    text.y = buttonHeight/2;
    text.style = {
        fontFamily: "Verdana",
        fontSize: 20,
        fill: ["#FFFFFF"],
      };
    text.text = "Ready to Spin!";

    const applyReadySkin: () => void = () => {
        background.clear();
        background.beginFill(readyColor);
        background.drawRect(0, 0, buttonWitdh, buttonHeight);
        background.endFill();
        text.text = "Ready to Spin!";
    }

    const applySpinningSkin: () => void = () => {
        background.clear();
        background.beginFill(disableColor);
        background.drawRect(0, 0, buttonWitdh, buttonHeight);
        background.endFill();
        text.text = "Spinning...";
    }

    const applyHoverSkin: () => void = () => {
        background.clear();
        background.beginFill(hoverColor);
        background.drawRect(0, 0, buttonWitdh, buttonHeight);
        background.endFill();
        text.text = "Click now!";
    }

    const container: PIXI.Container = new PIXI.Container();
    container.addChild(background);
    container.addChild(text);

    const playButton: PlayButton = {
        container: container,
        applyReadySkin: applyReadySkin,
        applySpinningSkin: applySpinningSkin,
        applyHoverSkin: applyHoverSkin
    }

    return playButton;

}