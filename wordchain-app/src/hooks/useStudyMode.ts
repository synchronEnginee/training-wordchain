import { useState, useMemo } from 'react';
import { filterWords } from '@/data/words';

export interface StudyModeState {
  selectedLengths: number[];      // 選択された文字数
  selectedStartChar: string | null; // 選択された開始文字
  searchQuery: string;            // 検索クエリ
  currentPage: number;            // 現在のページ
}

const ITEMS_PER_PAGE = 50;

export function useStudyMode() {
  const [state, setState] = useState<StudyModeState>({
    selectedLengths: [],
    selectedStartChar: null,
    searchQuery: '',
    currentPage: 1,
  });

  // フィルターされた単語リストを取得
  const filteredWords = useMemo(() => {
    return filterWords(state.selectedLengths, state.selectedStartChar, state.searchQuery);
  }, [state.selectedLengths, state.selectedStartChar, state.searchQuery]);

  // ページネーション用の計算
  const totalPages = useMemo(() => {
    return Math.ceil(filteredWords.length / ITEMS_PER_PAGE);
  }, [filteredWords.length]);

  const currentWords = useMemo(() => {
    const startIndex = (state.currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredWords.slice(startIndex, endIndex);
  }, [filteredWords, state.currentPage]);

  // 文字数フィルターの更新
  const updateLengthFilter = (lengths: number[]) => {
    setState(prev => ({
      ...prev,
      selectedLengths: lengths,
      currentPage: 1, // ページをリセット
    }));
  };

  // ひらがなフィルターの更新
  const updateStartCharFilter = (char: string | null) => {
    setState(prev => ({
      ...prev,
      selectedStartChar: char,
      currentPage: 1, // ページをリセット
    }));
  };

  // 検索クエリの更新
  const updateSearchQuery = (query: string) => {
    setState(prev => ({
      ...prev,
      searchQuery: query,
      currentPage: 1, // ページをリセット
    }));
  };

  // ページの変更
  const changePage = (page: number) => {
    setState(prev => ({
      ...prev,
      currentPage: page,
    }));
  };

  // フィルターをリセット
  const resetFilters = () => {
    setState({
      selectedLengths: [],
      selectedStartChar: null,
      searchQuery: '',
      currentPage: 1,
    });
  };

  return {
    state,
    filteredWords,
    currentWords,
    totalPages,
    updateLengthFilter,
    updateStartCharFilter,
    updateSearchQuery,
    changePage,
    resetFilters,
    totalCount: filteredWords.length,
  };
}