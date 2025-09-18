import { Word } from '@/data/words';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface WordListProps {
  words: Word[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalCount: number;
}

export function WordList({
  words,
  searchQuery,
  onSearchChange,
  currentPage,
  totalPages,
  onPageChange,
  totalCount
}: WordListProps) {
  const getPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }
    
    return buttons;
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        {/* 検索バー */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <Input
            type="text"
            placeholder="単語を検索..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* 結果件数 */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            {totalCount}件の単語が見つかりました
            {totalPages > 1 && (
              <span>（{currentPage}/{totalPages}ページ）</span>
            )}
          </span>
        </div>

        {/* 単語リスト */}
        {words.length > 0 ? (
          <div className="space-y-2">
            {words.map((word, index) => (
              <div
                key={`${word.text}-${index}`}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-medium">{word.text}</span>
                  <span className="text-sm text-gray-500">{word.length}文字</span>
                </div>
                <div className="text-sm text-gray-600">
                  「{word.firstChar}」→「{word.lastChar}」
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>条件に一致する単語が見つかりませんでした。</p>
            <p className="text-sm mt-1">フィルターを変更して再検索してください。</p>
          </div>
        )}

        {/* ページネーション */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ←
            </Button>

            {getPaginationButtons().map(page => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page)}
                className="min-w-[40px]"
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              →
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}