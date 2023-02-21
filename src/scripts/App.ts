import * as PIXI from 'pixi.js';
import { Assets, Spritesheet } from 'pixi.js';
import {config} from '../Config';
import {globals} from './Globals';
import {mainScene} from './MainScene';

export const app: () => void = () => {
    const pixiOptions: PIXI.IApplicationOptions = {
        width: config.appWidth,
        height: config.appHeight,
        backgroundColor: config.backgroundColor,
        backgroundAlpha: 0,
        clearBeforeRender: false,
        context: null,
        antialias: false,
        powerPreference: 'default',
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
        hello: false
    };

    const app: PIXI.Application = new PIXI.Application({
        backgroundColor: config.backgroundColor,
        width: config.appWidth,
        height: config.appHeight
    });

    Assets.load(config.slotMachineSheet).then((sheet: Spritesheet) => {
        globals.app = app;
        globals.slotTextureSheet = sheet;
        globals.numberOfSlotsInTextureSheet = Object.keys(sheet.textures).length;

        //console.log('globals.numberOfSlotsInTextureSheet: ', globals.numberOfSlotsInTextureSheet);

        mainScene(app);                
    });
}