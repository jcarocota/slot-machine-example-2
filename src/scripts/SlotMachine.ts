import * as PIXI from 'pixi.js';
import {Reel, createReel} from './Reel';
import {globals} from './Globals';
import {config} from '../Config';

export interface SlotMachine {
    container: PIXI.Container,
    reels: Reel[],
    slotMachinePlay: () => void
};

export const createSlotMachine: () => SlotMachine | undefined = () :  SlotMachine | undefined => {
    const slotMachineContainer: PIXI.Container = new PIXI.Container();

    slotMachineContainer.width = config.slotMachineWidth;
    slotMachineContainer.height = config.slotMachineHeight;

    const reels:Reel [] = [];

    for(let i = 0; i < config.numberOfReeels; i++) {
        const reel: Reel | undefined = createReel();
        if(reel) {
            reel.container.x = i * config.reelWidth;
            reel.container.y = 0; //-1*config.slotHeight;
            reels.push(reel);
            slotMachineContainer.addChild(reel.container);
        };
    };

    const visibleAreaSlotMachine = new PIXI.Graphics();
    visibleAreaSlotMachine.beginFill(0xFFFFFF);
    visibleAreaSlotMachine.drawRect(0, 0, config.slotMachineWidth, config.slotMachineHeight);
    visibleAreaSlotMachine.endFill();

    slotMachineContainer.mask = visibleAreaSlotMachine;

    const finishSpin: () => void = () => {
        globals.reelsStoppedAfterPlay++;
        console.log('Stopped ', globals.reelsStoppedAfterPlay, ' of ', config.numberOfReeels, ' reels');
        if(globals.reelsStoppedAfterPlay == config.numberOfReeels) {
            console.log('Slot Machine Play id Finished!');
        }
    };

    const slotMachinePlay: () => void = () => {
        if(!reels || reels.length < 1) {
            return;
        }

        globals.reelsStoppedAfterPlay = 0;

        reels.forEach( (reel:Reel, i:number) => {
            setTimeout(() => {
                reel.spinReel(finishSpin);
                console.log("Spin!!", new Date());
            }, i*config.delayBeyweenReelSpin);
            
        });

    };

    const slotMachine: SlotMachine = {
        container: slotMachineContainer,
        reels: reels,
        slotMachinePlay: slotMachinePlay,    
    };

    return slotMachine;
};
