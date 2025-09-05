'use client';

import { useGame } from '@/hooks/useGame';
import { GameCard } from '@/components/GameCard';
import { Timer } from '@/components/Timer';
import { HandCards } from '@/components/HandCards';
import { GameOptionsComponent } from '@/components/GameOptions';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { gameState, startGame, playCard, reshuffleHand, resetGame, updateOptions, getElapsedTime } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center py-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">しりとりカードゲーム</h1>
          <p className="text-gray-600">フィールドの文字で始まり、手札の文字で終わる単語を考えよう！</p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <Timer 
            elapsedTime={getElapsedTime()} 
            isActive={gameState.isGameActive}
            isFinished={gameState.gameFinished}
          />
        </div>

        {!gameState.isGameActive && !gameState.gameFinished && (
          <div className="mb-8">
            <GameOptionsComponent
              options={gameState.options}
              onOptionsChange={updateOptions}
              onStartGame={() => startGame(gameState.options)}
            />
          </div>
        )}

        {gameState.isGameActive || gameState.gameFinished ? (
          <div className="space-y-8">
            <div className="text-center">
              <div className="text-gray-600 text-sm mb-2">フィールド</div>
              <div className="flex justify-center">
                <GameCard character={gameState.field} isField={true} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <HandCards 
                hand={gameState.hand}
                onCardClick={playCard}
                disabled={gameState.gameFinished}
              />
            </div>

            {gameState.gameFinished && (
              <div className="text-center space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-green-800 mb-2">ゲームクリア！</h2>
                  <p className="text-green-700">
                    タイム: {Math.floor(gameState.finalTime! / 1000)}.{Math.floor((gameState.finalTime! % 1000) / 10).toString().padStart(2, '0')}秒
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    リシャッフル回数: {gameState.reshuffleCount}回
                  </p>
                </div>
                <Button onClick={resetGame} size="lg">
                  もう一度プレイ
                </Button>
              </div>
            )}

            {gameState.isGameActive && (
              <div className="text-center space-x-4">
                {gameState.options.enableReshuffle && (
                  <Button 
                    onClick={reshuffleHand} 
                    variant="secondary"
                    disabled={gameState.hand.length === 0}
                  >
                    手札リシャッフル ({gameState.hand.length} → {gameState.hand.length + 1})
                  </Button>
                )}
                <Button onClick={resetGame} variant="outline">
                  ゲームをリセット
                </Button>
              </div>
            )}
          </div>
        ) : null}

        {!gameState.isGameActive && !gameState.gameFinished && (
          <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
            <h2 className="text-xl font-bold mb-4">ゲームルール</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• フィールドの文字で<strong>始まり</strong>、手札の文字で<strong>終わる</strong>単語を考えます</li>
              <li>• 単語を思いついたら、対応する手札のカードをタップします</li>
              <li>• 手札を全てなくすまでの時間を競います</li>
              <li>• <strong>手札リシャッフル</strong>: 手札を全て山札に戻し、手札枚数+1枚を引き直せます（オプション）</li>
              <li>• <strong>数字カード</strong>: フィールドの頭文字で始まる指定文字数の単語を作れます（オプション）</li>
              <li>• 例: フィールドが「あ」、手札に「り」がある場合 → 「あり」</li>
              <li>• 例: フィールドが「あ」、手札に「5」がある場合 → 5文字の単語「あり がとう」</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
