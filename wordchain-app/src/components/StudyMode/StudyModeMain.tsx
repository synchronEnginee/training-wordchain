import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useStudyMode } from '@/hooks/useStudyMode';
import { LengthFilter } from './LengthFilter';
import { HiraganaFilter } from './HiraganaFilter';
import { WordList } from './WordList';

export function StudyModeMain() {
  const router = useRouter();
  const {
    state,
    currentWords,
    totalPages,
    updateLengthFilter,
    updateStartCharFilter,
    updateSearchQuery,
    changePage,
    resetFilters,
    totalCount,
  } = useStudyMode();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* ヘッダー */}
        <header className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/')}
              className="flex items-center space-x-2"
            >
              <span>←</span>
              <span>戻る</span>
            </Button>
            <h1 className="text-3xl font-bold text-gray-800">学習モード</h1>
          </div>
          <p className="text-gray-600">
            文字数とひらがなを選択して、しりとりで使える単語を探してみよう！
          </p>
        </header>

        {/* メインコンテンツ */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* フィルターエリア */}
          <div className="lg:col-span-1 space-y-4">
            <LengthFilter
              selectedLengths={state.selectedLengths}
              onLengthChange={updateLengthFilter}
            />
            
            <HiraganaFilter
              selectedChar={state.selectedStartChar}
              onCharChange={updateStartCharFilter}
            />

            {/* リセットボタン */}
            <Button
              variant="outline"
              onClick={resetFilters}
              className="w-full"
              disabled={
                state.selectedLengths.length === 0 && 
                !state.selectedStartChar && 
                !state.searchQuery
              }
            >
              すべてリセット
            </Button>
          </div>

          {/* 単語リストエリア */}
          <div className="lg:col-span-3">
            <WordList
              words={currentWords}
              searchQuery={state.searchQuery}
              onSearchChange={updateSearchQuery}
              currentPage={state.currentPage}
              totalPages={totalPages}
              onPageChange={changePage}
              totalCount={totalCount}
            />
          </div>
        </div>

        {/* フッター（使い方のヒント） */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-3">使い方</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <h3 className="font-medium mb-2">🔢 文字数フィルター</h3>
              <p>しりとりで作りたい単語の文字数を選択できます。複数選択可能です。</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">🔤 ひらがなフィルター</h3>
              <p>選択した文字で始まる単語だけを表示します。フィールドの文字に合わせて選択しましょう。</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">🔍 検索機能</h3>
              <p>知っている単語を検索して、その単語が何文字で何で終わるか確認できます。</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">📝 しりとりのコツ</h3>
              <p>単語の最後の文字を確認して、手札に合うかどうかチェックしましょう。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}