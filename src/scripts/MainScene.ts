import * as PIXI from 'pixi.js';
import {createSlotMachine} from './SlotMachine';
import {createPlayButton} from './PlayButton';
import { config } from '../Config';
import { globals } from './Globals';

export const mainScene: (app:PIXI.Application) => void = (app) => {
    document.body.appendChild(app.view as HTMLCanvasElement);

    /*
    let slotObject = createSlot(); 
    if(slotObject) {
        app.stage.addChild(slotObject.sprite);
    }
    */

    /*let reel = createReel();
    if(reel) {
        app.stage.addChild(reel.container);
    }*/

    let slotMachine = createSlotMachine();
    if(slotMachine) {
        app.stage.addChild(slotMachine.container);
        //slotMachine.container.y = 50;
    }

    let playButton = createPlayButton();
    if(playButton) {
        app.stage.addChild(playButton.container);
        playButton.container.y = config.slotMachineHeight + 10;
        playButton.container.interactive = true;
        playButton.container.on('pointerdown', (e) => {
            console.log('Click on play Button!');
            slotMachine?.slotMachinePlay();
            playButton.container.interactive = false;
        });

        playButton.container.on('pointerenter', (e) => {
            playButton.applyHoverSkin();
        });
        playButton.container.on('pointerleave', (e) => {
            playButton.applyReadySkin();
        });
        globals.playButton = playButton;
    }

}