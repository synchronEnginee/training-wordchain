import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GameOptions } from "@/types/game";

interface GameOptionsProps {
  options: GameOptions;
  onOptionsChange: (options: GameOptions) => void;
  onStartGame: () => void;
}

export function GameOptionsComponent({ options, onOptionsChange, onStartGame }: GameOptionsProps) {
  const handleToggle = (key: keyof GameOptions) => {
    onOptionsChange({
      ...options,
      [key]: !options[key],
    });
  };

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-center">ゲーム設定</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex-1">
            <h3 className="font-semibold">手札リシャッフル機能</h3>
            <p className="text-sm text-gray-600 mt-1">
              手札を全て山札に戻し、手札枚数+1枚を引き直せます
            </p>
          </div>
          <Button
            variant={options.enableReshuffle ? "default" : "outline"}
            size="sm"
            onClick={() => handleToggle('enableReshuffle')}
            className="ml-4"
          >
            {options.enableReshuffle ? "ON" : "OFF"}
          </Button>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex-1">
            <h3 className="font-semibold">数字カード機能</h3>
            <p className="text-sm text-gray-600 mt-1">
              5,6,7の数字カードが追加され、指定文字数の単語を作れます
            </p>
          </div>
          <Button
            variant={options.enableNumberCards ? "default" : "outline"}
            size="sm"
            onClick={() => handleToggle('enableNumberCards')}
            className="ml-4"
          >
            {options.enableNumberCards ? "ON" : "OFF"}
          </Button>
        </div>
      </div>

      <div className="text-center pt-4">
        <Button onClick={onStartGame} size="lg" className="px-8 py-3 text-lg">
          ゲームスタート
        </Button>
      </div>
    </Card>
  );
}