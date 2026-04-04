import { ICard } from "./card";
interface IPrepare {
  cards?: ICard[];
  selectedCars_1: ICard | null;
  selectedCars_2: ICard | null;
  selectedIndex_1?: number;
  selectedIndex_2?: number;
  progress?: number;
  fullTrack?: HTMLAudioElement;
  flipAudia?: HTMLAudioElement;
  goodAudio?: HTMLAudioElement;
  failAudio?: HTMLAudioElement;
  gameOverAudio?: HTMLAudioElement;
}

export { IPrepare };
