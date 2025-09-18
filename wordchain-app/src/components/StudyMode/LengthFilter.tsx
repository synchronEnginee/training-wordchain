import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface LengthFilterProps {
  selectedLengths: number[];
  onLengthChange: (lengths: number[]) => void;
}

const AVAILABLE_LENGTHS = [4, 5, 6, 7, 8]; // 8は8文字以上を表す

export function LengthFilter({ selectedLengths, onLengthChange }: LengthFilterProps) {
  const toggleLength = (length: number) => {
    if (selectedLengths.includes(length)) {
      onLengthChange(selectedLengths.filter(l => l !== length));
    } else {
      onLengthChange([...selectedLengths, length]);
    }
  };

  const selectAll = () => {
    onLengthChange(AVAILABLE_LENGTHS);
  };

  const clearAll = () => {
    onLengthChange([]);
  };

  return (
    <Card className="p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">文字数</h3>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={selectAll}
              disabled={selectedLengths.length === AVAILABLE_LENGTHS.length}
            >
              全選択
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearAll}
              disabled={selectedLengths.length === 0}
            >
              クリア
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {AVAILABLE_LENGTHS.map(length => (
            <Button
              key={length}
              variant={selectedLengths.includes(length) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleLength(length)}
              className="h-10"
            >
              {length === 8 ? "8文字以上" : `${length}文字`}
            </Button>
          ))}
        </div>
        
        {selectedLengths.length > 0 && (
          <div className="text-sm text-gray-600">
            選択中: {selectedLengths.map(l => l === 8 ? "8文字以上" : `${l}文字`).join(", ")}
          </div>
        )}
      </div>
    </Card>
  );
}