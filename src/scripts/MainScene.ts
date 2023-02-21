import * as PIXI from "pixi.js";
import { SlotMachine, createSlotMachine } from "./SlotMachine";
import { PlayButton, createPlayButton } from "./PlayButton";
import { InfoBar, createInfoBar } from "./InfoBar";
import { config } from "../Config";
import { globals } from "./Globals";

export const mainScene: (app: PIXI.Application) => void = (app) => {
  document.body.appendChild(app.view as HTMLCanvasElement);

  let slotMachine: SlotMachine = createSlotMachine();
  if (slotMachine) {
    app.stage.addChild(slotMachine.container);
  }

  const buttonWitdh: number = 180; //pixels
  const buttonHeight: number = 80; // pixels

  const playButton: PlayButton = createPlayButton(buttonWitdh, buttonHeight);
  if (playButton) {
    app.stage.addChild(playButton.container);
    playButton.container.y = config.slotMachineHeight + 10;
    playButton.container.x = config.slotMachineWidth - buttonWitdh;
    playButton.container.interactive = true;
    playButton.container.on("pointerdown", (e) => {
      console.log("Click on play Button!");
      slotMachine?.slotMachinePlay();
      playButton.container.interactive = false;
    });

    playButton.container.on("pointerenter", (e) => {
      playButton.applyHoverSkin();
    });
    playButton.container.on("pointerleave", (e) => {
      playButton.applyReadySkin();
    });
    globals.playButton = playButton;
  }

  const infoBarWitdh: number = 180; //pixels
  const infoBarHeight: number = 80; //pixels

  const infoBar: InfoBar = createInfoBar(infoBarWitdh, infoBarHeight);
  if (infoBar) {
    app.stage.addChild(infoBar.container);
    infoBar.container.x = 0;
    infoBar.container.y = config.slotMachineHeight + 10;
  }
};
