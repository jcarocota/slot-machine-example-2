interface PrimaryConfig {
  acelerationIndex: number;
  appHeight: number;
  appWidth: number;
  backgroundColor: number;
  blurStrengthIndex: number;
  delayBetweenReelSpin: number;
  delayBetweenFPSUpdate: number;
  numberOfReeels: number;
  numberOfSlotsByReel: number;
  slotMachineHeight: number;
  slotMachineWidth: number;
  slotMachineSheet: string;
  spinDurationInMillis: number;
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
  acelerationIndex: 0.2,
  appHeight: 460,
  appWidth: 600,
  backgroundColor: 0xd5d8dc,
  blurStrengthIndex: 20,
  delayBetweenReelSpin: 200, //Milisec
  delayBetweenFPSUpdate: 500,
  numberOfReeels: 5, //Number of reels in slot machine
  numberOfSlotsByReel: 3, //Number of slots by reel
  slotMachineHeight: 360, //Pixels
  slotMachineWidth: 600,
  slotMachineSheet: "./assets/sprites/slot-machine.json", //Path of slot machine sprites' atlas
  spinDurationInMillis: 3000, //Duration of spin event for each reel
  spinSpeedIndex: 10, //Pixels, the size of step each slot is needed to move each spin
};

//Final config - Do not change for a literal value
export const config: Config = {
  acelerationIndex: primaryConfig.acelerationIndex,
  appHeight: primaryConfig.appHeight,
  appWidth: primaryConfig.appWidth,
  backgroundColor: primaryConfig.backgroundColor,
  blurStrengthIndex: primaryConfig.blurStrengthIndex,
  delayBetweenReelSpin: primaryConfig.delayBetweenReelSpin,
  delayBetweenFPSUpdate: primaryConfig.delayBetweenFPSUpdate,
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
  slotOffset: 4,
};
