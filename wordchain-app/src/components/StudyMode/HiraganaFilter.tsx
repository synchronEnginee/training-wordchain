import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface HiraganaFilterProps {
  selectedChar: string | null;
  onCharChange: (char: string | null) => void;
}

// 50音表（濁音・半濁音を除く）
const HIRAGANA_GRID = [
  ['あ', 'い', 'う', 'え', 'お'],
  ['か', 'き', 'く', 'け', 'こ'],
  ['さ', 'し', 'す', 'せ', 'そ'],
  ['た', 'ち', 'つ', 'て', 'と'],
  ['な', 'に', 'ぬ', 'ね', 'の'],
  ['は', 'ひ', 'ふ', 'へ', 'ほ'],
  ['ま', 'み', 'む', 'め', 'も'],
  ['や', '', 'ゆ', '', 'よ'],
  ['ら', 'り', 'る', 'れ', 'ろ'],
  ['わ', '', '', '', '']
];

export function HiraganaFilter({ selectedChar, onCharChange }: HiraganaFilterProps) {
  const selectChar = (char: string) => {
    if (selectedChar === char) {
      onCharChange(null); // 既に選択されている場合は解除
    } else {
      onCharChange(char);
    }
  };

  const clearSelection = () => {
    onCharChange(null);
  };

  return (
    <Card className="p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">ひらがな</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={clearSelection}
            disabled={!selectedChar}
          >
            クリア
          </Button>
        </div>

        <div className="grid grid-cols-5 gap-1">
          {HIRAGANA_GRID.map((row, rowIndex) =>
            row.map((char, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`}>
                {char ? (
                  <Button
                    variant={selectedChar === char ? "default" : "outline"}
                    size="sm"
                    onClick={() => selectChar(char)}
                    className="w-full h-10 text-lg"
                  >
                    {char}
                  </Button>
                ) : (
                  <div className="w-full h-10" />
                )}
              </div>
            ))
          )}
        </div>

        {selectedChar && (
          <div className="text-sm text-gray-600">
            選択中: 「{selectedChar}」で始まる単語
          </div>
        )}
      </div>
    </Card>
  );
}