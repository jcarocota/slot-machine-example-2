import * as PIXI from 'pixi.js';
import {createSlotMachine} from './SlotMachine';

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
        slotMachine.container.interactive = true;
        slotMachine.container.on('pointerdown', (e) => {
            console.log('Click on app!');
            slotMachine?.slotMachinePlay();
        });
        //slotMachine.container.y = 50;
    }

}