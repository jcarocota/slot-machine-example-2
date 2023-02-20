import * as PIXI from 'pixi.js';
import {config} from '../Config';

interface Globals {
    app?: PIXI.Application,
    numberOfSlotsInTextureSheet: number,
    slotTextureSheet?: PIXI.Spritesheet,
    reelsStoppedAfterPlay: number
}

export const globals: Globals = {
    numberOfSlotsInTextureSheet: 0,
    reelsStoppedAfterPlay: config.numberOfReeels
}