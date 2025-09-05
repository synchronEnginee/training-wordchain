import { GameCard } from './GameCard';

interface HandCardsProps {
  hand: string[];
  onCardClick: (index: number) => void;
  disabled?: boolean;
}

export function HandCards({ hand, onCardClick, disabled = false }: HandCardsProps) {
  return (
    <div className="w-full">
      <div className="text-center text-gray-600 text-sm mb-2">
        手札 ({hand.length}枚)
      </div>
      <div className="flex justify-center gap-2 flex-wrap">
        {hand.map((character, index) => (
          <GameCard
            key={`${character}-${index}`}
            character={character}
            onClick={disabled ? undefined : () => onCardClick(index)}
            className={disabled ? "opacity-50 cursor-not-allowed" : ""}
          />
        ))}
      </div>
    </div>
  );
}