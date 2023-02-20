import * as PIXI from 'pixi.js';
import {Slot, createSlot} from './Slot';
import {config} from '../Config';
import {MotionBlurFilter} from 'pixi-filters';

export interface Reel {
    container: PIXI.Container,
    slots: Slot[],
    spinReel: (finishSpin: () => void) => Promise<void>
};

export const createReel: () => Reel | undefined = () :  Reel | undefined => {
    const reelContainer: PIXI.Container = new PIXI.Container();

    reelContainer.width = config.reelWidth;
    reelContainer.height = config.reelHeight;

    const slots:Slot [] = [];

    for(let i = 0; i < config.numberOfSlotsByReel + config.slotOffset; i++) {
        const slot: Slot | undefined = createSlot();
        if(slot) {
            slot.sprite.x = 0;
            slot.sprite.y = i * config.slotHeight;
            slots.push(slot);
            reelContainer.addChild(slot.sprite);
        };
    };

    const spinReel: (finishSpin: () => void) => Promise<void> = async (finishSpin: () => void) => {
        let timeLeftForSpin: number = config.spinDurationInMillis;
        let acelerationIncrement: number = 0;

        const ticker = new PIXI.Ticker();
        ticker.stop();
        //let elapsedTime:number = 0;

        let finishAnimation: boolean = false;
        let finalSlotListIsSet: boolean = false;

        const blurFilter = new PIXI.BlurFilterPass(false,config.blurStrengthIndex,5,undefined,9);
        //blurFilter.blur = 5.0;
        reelContainer.filters = [blurFilter];

        const tickEvent = () => {
            slots.forEach((slot: Slot, i:number) => {
                if(slot.sprite.y <= -1*config.slotHeight) {
                    slots.shift();
                    let newSlot: Slot | undefined  = createSlot();
                    if(newSlot) {
                        let lastSlot = slots[slots.length-1];
                        newSlot.sprite.x = 0;
                        newSlot.sprite.y = lastSlot.sprite.y + config.slotHeight;
                        slots.push(newSlot);
                        reelContainer.addChild(newSlot.sprite);
                        finalSlotListIsSet = finishAnimation;
                    }
                } else {
                    //slot.sprite.filters = [blurFilter];
                    slot.sprite.y += -1*(config.spinSpeedIndex + acelerationIncrement);
                }
            });

            if(finalSlotListIsSet) {
                slots.forEach((slot: Slot, i:number) => {
                    slot.sprite.y = i * config.slotHeight;
                    //slot.sprite.filters = [];
                });
                reelContainer.filters = [];

                ticker.stop();
                ticker.remove(tickEvent);

                if(finishSpin) {
                    finishSpin();
                    console.log("we're gone");
                    return;
                };

            };

            timeLeftForSpin-=ticker.deltaMS;

            if(timeLeftForSpin <= 0) {
                finishAnimation = true;
                console.log("Time to go");
                //acelerationIndex-=acelerationIncrement;
                //acelerationIndex = acelerationIndex < 0 ? 0 : acelerationIndex;
            } else {
                if(timeLeftForSpin/config.spinDurationInMillis > 0.6) {
                    acelerationIncrement+=config.acelerationIndex;
                    blurFilter.strength+=config.acelerationIndex;
                } else {
                    acelerationIncrement-=config.acelerationIndex*2;
                    blurFilter.strength-=config.acelerationIndex*2;
                    acelerationIncrement = acelerationIncrement < 0 ? 0 : acelerationIncrement;
                    blurFilter.strength = blurFilter.strength < 0 ? 0 : blurFilter.strength;
                }
                //acelerationIndex = acelerationIndex > 2 ? 2 : acelerationIndex;
            }
            //console.log('timeLeftForSpin', timeLeftForSpin);
            
            //elapsedTime+=ticker.deltaMS;
            //console.log("elapsedTime", elapsedTime);
        };

        
        ticker.add(tickEvent);
        ticker.start();

        
    };

    const reel: Reel = {
        container: reelContainer,
        slots: slots,
        spinReel: spinReel        
    };

    return reel;
};
