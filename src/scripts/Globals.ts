import * as PIXI from 'pixi.js';
import {config} from '../Config';
import {PlayButton} from './PlayButton';

interface Globals {
    app?: PIXI.Application,
    numberOfSlotsInTextureSheet: number,
    slotTextureSheet?: PIXI.Spritesheet,
    reelsStoppedAfterPlay: number,
    playButton?: PlayButton
}

export const globals: Globals = {
    numberOfSlotsInTextureSheet: 0,
    reelsStoppedAfterPlay: config.numberOfReeels
}