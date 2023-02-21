import * as PIXI from "pixi.js";
import { globals } from "./Globals";
import { config } from "../Config";

export interface Slot {
  tag: string;
  sprite: PIXI.Sprite;
}

const calculateTagSlot: () => string = () => {
  const numFruit: number = Math.ceil(
    Math.random() * globals.numberOfSlotsInTextureSheet
  );
  const tagSlot: string = numFruit.toString();

  return tagSlot;
};

export const createSlot: () => Slot | undefined = (): Slot | undefined => {
  if (!globals.slotTextureSheet) {
    return;
  }

  const tagSlot: string = calculateTagSlot();
  const sprite: PIXI.Sprite = new PIXI.Sprite(
    globals.slotTextureSheet.textures[tagSlot]
  );

  sprite.width = config.slotWidth;
  sprite.height = config.slotHeight;

  const slot: Slot = {
    tag: tagSlot,
    sprite: sprite,
  };

  return slot;
};
