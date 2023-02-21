import * as PIXI from "pixi.js";
import { Slot, createSlot } from "./Slot";
import { config } from "../Config";

export interface Reel {
  container: PIXI.Container;
  slots: Slot[];
  spinReel: (finishSpin: () => void) => Promise<void>;
}

const slotsOnReadyPosition: (slots: Slot[]) => void = (slots: Slot[]) => {
  slots.forEach((slot: Slot, i: number) => {
    slot.sprite.x = 0;
    slot.sprite.y = i * config.slotHeight;
  });
};

export const createReel: () => Reel | undefined = (): Reel | undefined => {
  const reelContainer: PIXI.Container = new PIXI.Container();

  reelContainer.width = config.reelWidth;
  reelContainer.height = config.reelHeight;

  const background: PIXI.Graphics = new PIXI.Graphics();
  background.beginFill(config.backgroundReelColor);
  background.drawRect(
    0,
    -1 * config.slotHeight,
    config.reelWidth,
    config.reelHeight + config.slotHeight * 2
  );
  background.endFill();
  reelContainer.addChild(background);

  const slots: Slot[] = [];

  for (let i = 0; i < config.numberOfSlotsByReel + config.slotOffset; i++) {
    const slot: Slot | undefined = createSlot();
    if (slot) {
      slots.push(slot);
      reelContainer.addChild(slot.sprite);
    }
  }

  slotsOnReadyPosition(slots);

  const spinReel: (finishSpin: () => void) => Promise<void> = async (
    finishSpin: () => void
  ) => {
    let timeLeftForSpin: number = config.spinDurationInMillis;
    let acelerationIncrement: number = 0;

    const ticker = new PIXI.Ticker();
    ticker.stop();
    //let elapsedTime:number = 0;

    let finishAnimation: boolean = false;
    let finalSlotListIsSet: boolean = false;

    const blurFilter = new PIXI.BlurFilterPass(
      false,
      config.blurStrengthIndex,
      5,
      undefined,
      9
    );

    reelContainer.filters = [blurFilter];

    const tickEvent = () => {
      slots.forEach((slot: Slot, i: number) => {
        if (slot.sprite.y <= -1 * config.slotHeight) {
          slots.shift();
          let newSlot: Slot | undefined = createSlot();
          if (newSlot) {
            let lastSlot = slots[slots.length - 1];
            newSlot.sprite.x = 0;
            newSlot.sprite.y = lastSlot.sprite.y + config.slotHeight;
            slots.push(newSlot);
            reelContainer.addChild(newSlot.sprite);
            finalSlotListIsSet = finishAnimation;
          }
        } else {
          slot.sprite.y += -1 * (config.spinSpeedIndex + acelerationIncrement);
        }
      });

      if (finalSlotListIsSet) {
        slotsOnReadyPosition(slots);
        reelContainer.filters = [];

        ticker.stop();
        ticker.remove(tickEvent);

        let bounceEffectDuration = config.bounceEffectDuration;
        let bounceStepYAxis = config.maxBounceStepYAxis;
        let sineAngle = 0;

        const tickEventBounceEffect = () => {
          let bounceYAxis = bounceStepYAxis * Math.sin(sineAngle);
          sineAngle += 0.5;
          reelContainer.y = bounceYAxis;

          bounceEffectDuration -= ticker.deltaMS;
          if (bounceEffectDuration <= 0) {
            reelContainer.y = 0;
            ticker.stop();
            ticker.remove(tickEventBounceEffect);
            console.log("Bye Bouncing");

            if (finishSpin) {
              finishSpin();
              console.log("we're gone");
              return;
            }
          } else {
            bounceStepYAxis =
              config.maxBounceStepYAxis *
              (bounceEffectDuration / config.bounceEffectDuration);
          }

          console.log("Bouncing");
        };
        ticker.add(tickEventBounceEffect);
        ticker.start();
      }

      timeLeftForSpin -= ticker.deltaMS;

      if (timeLeftForSpin <= 0) {
        finishAnimation = true;
        console.log("Time to go");
      } else {
        if (
          timeLeftForSpin / config.spinDurationInMillis >
          config.spinCompletionPercentageForDeceleration
        ) {
          acelerationIncrement += config.acelerationIndex;
          blurFilter.strength += config.acelerationIndex;
        } else {
          acelerationIncrement -= config.acelerationIndex;
          blurFilter.strength -= config.acelerationIndex;
          acelerationIncrement =
            acelerationIncrement < 0 ? 0 : acelerationIncrement;
          blurFilter.strength =
            blurFilter.strength < 0 ? 0 : blurFilter.strength;
        }
      }
    };

    ticker.add(tickEvent);
    ticker.start();
  };

  const reel: Reel = {
    container: reelContainer,
    slots: slots,
    spinReel: spinReel,
  };

  return reel;
};
