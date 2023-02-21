import * as PIXI from "pixi.js";
import { config } from "../Config";

export interface InfoBar {
  container: PIXI.Container;
}

export const createInfoBar: (
  buttonWitdh: number,
  buttonHeight: number
) => InfoBar = (buttonWitdh: number, buttonHeight: number) => {
  const text: PIXI.Text = new PIXI.Text();
  text.anchor.set(0.5);
  text.x = buttonWitdh / 2;
  text.y = buttonHeight / 2;
  text.style = {
    fontFamily: "Verdana",
    fontSize: 20,
    fill: ["#000000"],
  };

  const ticker: PIXI.Ticker = PIXI.Ticker.shared;
  setInterval(() => {
    text.text = "FPS: " + ticker.FPS.toFixed(4);
  }, config.delayBetweenFPSUpdate);

  const container: PIXI.Container = new PIXI.Container();
  container.addChild(text);

  const infoBar: InfoBar = {
    container: container,
  };

  return infoBar;
};
