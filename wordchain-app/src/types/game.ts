export interface Card {
  character: string;
  id: string;
}

export interface GameOptions {
  enableReshuffle: boolean;
  enableNumberCards: boolean;
}

export interface GameState {
  deck: string[];
  hand: string[];
  field: string;
  startTime: number | null;
  isGameActive: boolean;
  gameFinished: boolean;
  finalTime: number | null;
  reshuffleCount: number;
  options: GameOptions;
}

export const HIRAGANA_CHARACTERS = [
  'あ', 'い', 'う', 'え', 'お',
  'か', 'き', 'く', 'け', 'こ',
  'さ', 'し', 'す', 'せ', 'そ',
  'た', 'ち', 'つ', 'て', 'と',
  'な', 'に', 'ぬ', 'ね', 'の',
  'は', 'ひ', 'ふ', 'へ', 'ほ',
  'ま', 'み', 'む', 'め', 'も',
  'や', 'ゆ', 'よ',
  'ら', 'り', 'る', 'れ', 'ろ',
  'わ'
];

export const NUMBER_CARDS = ['5', '6', '7'];

export const isNumberCard = (character: string): boolean => {
  return NUMBER_CARDS.includes(character);
};

export const isHiraganaCard = (character: string): boolean => {
  return HIRAGANA_CHARACTERS.includes(character);
};