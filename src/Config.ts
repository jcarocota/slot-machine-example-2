interface PrimaryConfig {
  acelerationIndex: number;
  appHeight: number;
  appWidth: number;
  backgroundAppColor: number;
  backgroundReelColor: number;
  blurStrengthIndex: number;
  bounceEffectDuration: number;
  componentSeparator: number;
  delayBetweenReelSpin: number;
  delayBetweenFPSUpdate: number;
  maxBounceStepYAxis: number;
  numberOfReeels: number;
  numberOfSlotsByReel: number;
  slotMachineHeight: number;
  slotMachineWidth: number;
  slotMachineSheet: string;
  spinDurationInMillis: number;
  spinCompletionPercentageForDeceleration: number;
  spinSpeedIndex: number;
}

interface Config extends PrimaryConfig {
  reelHeight: number;
  reelWidth: number;
  slotHeight: number;
  slotWidth: number;
  slotOffset: number;
}

//This part must be set by the user
const primaryConfig: PrimaryConfig = {
  acelerationIndex: 0.2, //Amount of pixels for speed increment during reel spinning
  appHeight: 460, // Height in pixels for APP
  appWidth: 600, // Width in pixels for APP
  backgroundAppColor: 0xd5d8dc, //Hex color for App background
  backgroundReelColor: 0x0d2331, //Hex color for Reel background
  blurStrengthIndex: 20, //Blur index for Slots during spinning
  bounceEffectDuration: 1000, //Duration in Milisecs for reel bouncing effect
  componentSeparator: 10, //Pixels of separation between components
  delayBetweenReelSpin: 200, //Delay in Milisecs to start a new reel spinning
  delayBetweenFPSUpdate: 500, //Delay in Milisecs for updating FPS Info
  maxBounceStepYAxis: 15, //Max step in pixels that a reel could experiment during bouncing animation
  numberOfReeels: 5, //Number of reels in slot machine
  numberOfSlotsByReel: 3, //Number of slots by reel
  slotMachineHeight: 360, //Height in pixels for the slot machine
  slotMachineWidth: 600, //Width in pixels for the slot machine
  slotMachineSheet: "./assets/sprites/slot-machine.json", //Path of slot machine sprites' atlas
  spinDurationInMillis: 3000, //Duration in Milisecs of spin event for each reel
  spinCompletionPercentageForDeceleration: 0.6, //When spin animations reach this percentage, reel speed will decrease
  spinSpeedIndex: 10, //Pixels, the size of step each slot is needed to move each spin
};

//Final config - Do not change for a literal value
export const config: Config = {
  acelerationIndex: primaryConfig.acelerationIndex,
  appHeight: primaryConfig.appHeight,
  appWidth: primaryConfig.appWidth,
  backgroundAppColor: primaryConfig.backgroundAppColor,
  backgroundReelColor: primaryConfig.backgroundReelColor,
  blurStrengthIndex: primaryConfig.blurStrengthIndex,
  bounceEffectDuration: primaryConfig.bounceEffectDuration,
  componentSeparator: primaryConfig.componentSeparator,
  delayBetweenReelSpin: primaryConfig.delayBetweenReelSpin,
  delayBetweenFPSUpdate: primaryConfig.delayBetweenFPSUpdate,
  maxBounceStepYAxis: primaryConfig.maxBounceStepYAxis,
  numberOfReeels: primaryConfig.numberOfReeels,
  numberOfSlotsByReel: primaryConfig.numberOfSlotsByReel,
  reelHeight: primaryConfig.slotMachineHeight,
  reelWidth: primaryConfig.slotMachineWidth / primaryConfig.numberOfReeels,
  slotMachineHeight: primaryConfig.slotMachineHeight,
  slotMachineWidth: primaryConfig.slotMachineWidth,
  slotHeight:
    primaryConfig.slotMachineHeight / primaryConfig.numberOfSlotsByReel,
  slotWidth: primaryConfig.slotMachineWidth / primaryConfig.numberOfReeels,
  slotMachineSheet: primaryConfig.slotMachineSheet,
  spinDurationInMillis: primaryConfig.spinDurationInMillis,
  spinSpeedIndex: primaryConfig.spinSpeedIndex,
  spinCompletionPercentageForDeceleration:
    primaryConfig.spinCompletionPercentageForDeceleration,
  slotOffset: 2, // number of not visible extra Slots to avoid blank spaces during reel animation
};
