import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { isNumberCard } from "@/types/game";

interface GameCardProps {
  character: string;
  onClick?: () => void;
  isField?: boolean;
  className?: string;
}

export function GameCard({ character, onClick, isField = false, className }: GameCardProps) {
  const isNumber = isNumberCard(character);
  
  return (
    <Card
      className={cn(
        "flex items-center justify-center transition-all duration-300 select-none",
        "transform-gpu backface-hidden",
        onClick && "cursor-pointer hover:shadow-xl hover:-translate-y-2 hover:scale-105 active:scale-95",
        isField 
          ? "w-28 h-40 text-5xl font-bold bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-blue-300 shadow-lg" 
          : isNumber
            ? "w-18 h-28 text-3xl font-bold bg-gradient-to-br from-orange-100 to-orange-200 border-2 border-orange-300 hover:border-orange-400 hover:bg-gradient-to-br hover:from-orange-150 hover:to-orange-100 shadow-md"
            : "w-18 h-28 text-3xl font-bold bg-gradient-to-br from-white to-gray-50 border-2 border-gray-300 hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-white shadow-md",
        className
      )}
      onClick={onClick}
    >
      <div className="text-center drop-shadow-sm flex flex-col items-center">
        {isNumber && !isField && (
          <div className="text-xs text-orange-600 font-medium mb-1">
            {character}文字
          </div>
        )}
        <div>{character}</div>
      </div>
    </Card>
  );
}