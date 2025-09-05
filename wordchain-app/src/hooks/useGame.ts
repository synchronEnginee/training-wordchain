'use client';

import { useState, useCallback } from 'react';
import { GameState, GameOptions, HIRAGANA_CHARACTERS, NUMBER_CARDS, isNumberCard } from '@/types/game';

const defaultOptions: GameOptions = {
  enableReshuffle: true,
  enableNumberCards: false,
};

const initialGameState: GameState = {
  deck: [],
  hand: [],
  field: '',
  startTime: null,
  isGameActive: false,
  gameFinished: false,
  finalTime: null,
  reshuffleCount: 0,
  options: defaultOptions,
};

export function useGame() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const shuffleArray = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const createDeck = useCallback((options: GameOptions) => {
    let deck = [...HIRAGANA_CHARACTERS, ...HIRAGANA_CHARACTERS];
    
    if (options.enableNumberCards) {
      deck = [...deck, ...NUMBER_CARDS, ...NUMBER_CARDS];
    }
    
    return shuffleArray(deck);
  }, []);

  const findNextHiraganaCard = useCallback((deck: string[], startIndex: number): { card: string; newDeck: string[] } => {
    const newDeck = [...deck];
    let index = startIndex;
    
    while (index < newDeck.length && isNumberCard(newDeck[index])) {
      index++;
    }
    
    if (index >= newDeck.length) {
      // 山札にひらがなカードがない場合、最初のカードを使用
      const card = newDeck[0];
      newDeck.splice(0, 1);
      return { card, newDeck };
    }
    
    const card = newDeck[index];
    newDeck.splice(index, 1);
    return { card, newDeck };
  }, []);

  const startGame = useCallback((options?: GameOptions) => {
    const gameOptions = options || gameState.options;
    const deck = createDeck(gameOptions);
    const hand = deck.slice(0, 5);
    const remainingDeck = deck.slice(5);
    
    const { card: field, newDeck: finalDeck } = findNextHiraganaCard(remainingDeck, 0);

    setGameState({
      deck: finalDeck,
      hand,
      field,
      startTime: Date.now(),
      isGameActive: true,
      gameFinished: false,
      finalTime: null,
      reshuffleCount: 0,
      options: gameOptions,
    });
  }, [createDeck, findNextHiraganaCard, gameState.options]);

  const playCard = useCallback((cardIndex: number) => {
    if (!gameState.isGameActive || gameState.gameFinished) return;

    setGameState(prevState => {
      const newHand = [...prevState.hand];
      const playedCard = newHand[cardIndex];
      newHand.splice(cardIndex, 1);

      let newState = {
        ...prevState,
        hand: newHand,
      };

      // 数字カードの場合はフィールドを新しいひらがなカードに更新
      if (isNumberCard(playedCard)) {
        const { card: newField, newDeck } = findNextHiraganaCard(prevState.deck, 0);
        newState = {
          ...newState,
          field: newField,
          deck: newDeck,
        };
      } else {
        // 通常のひらがなカードの場合はそのままフィールドに
        newState = {
          ...newState,
          field: playedCard,
        };
      }

      // ゲーム終了判定
      if (newHand.length === 0) {
        newState.gameFinished = true;
        newState.isGameActive = false;
        newState.finalTime = prevState.startTime ? Date.now() - prevState.startTime : 0;
      }

      return newState;
    });
  }, [gameState.isGameActive, gameState.gameFinished, findNextHiraganaCard]);

  const reshuffleHand = useCallback(() => {
    if (!gameState.isGameActive || gameState.gameFinished || !gameState.options.enableReshuffle) return;
    
    setGameState(prevState => {
      const currentHandSize = prevState.hand.length;
      if (currentHandSize === 0) return prevState;
      
      // 手札を山札に戻す
      const newDeck = shuffleArray([...prevState.deck, ...prevState.hand]);
      
      // 手札枚数+1枚を新しい手札として引く
      const newHandSize = currentHandSize + 1;
      const newHand = newDeck.slice(0, newHandSize);
      const remainingDeck = newDeck.slice(newHandSize);
      
      return {
        ...prevState,
        deck: remainingDeck,
        hand: newHand,
        reshuffleCount: prevState.reshuffleCount + 1,
      };
    });
  }, [gameState.isGameActive, gameState.gameFinished, gameState.options.enableReshuffle]);

  const resetGame = useCallback(() => {
    setGameState(prev => ({ ...initialGameState, options: prev.options }));
  }, []);

  const updateOptions = useCallback((newOptions: GameOptions) => {
    setGameState(prev => ({ ...prev, options: newOptions }));
  }, []);

  const getElapsedTime = useCallback(() => {
    if (!gameState.startTime) return 0;
    if (gameState.finalTime) return gameState.finalTime;
    return Date.now() - gameState.startTime;
  }, [gameState.startTime, gameState.finalTime]);

  return {
    gameState,
    startGame,
    playCard,
    reshuffleHand,
    resetGame,
    updateOptions,
    getElapsedTime,
  };
}