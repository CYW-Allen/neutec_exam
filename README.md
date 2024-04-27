# 實作概述

## 九宮格
  - 使用 CSS `Grid` + `animation` 處理版面 & 動畫渲染需求。

## 球
  - **資料結構**: 物件類型，記錄起點、終點位置 (`startX`, `startY`, `endX`, `endY`)。
  - **動畫處理**: 為滿足球數量及移動方式可隨需求變動，使用 Element API **`animate`** 賦予元素動畫效果。
  - **額外功能**: 實作一彈出視窗提供球的數量以及每顆球起點終點設定。當確認設定後，畫面即會渲染出對應的球數 & 動畫方式。  (*球數量: 0 ~ 100*)

## 側邊選單
  - **開啟/關閉**: 使用 CSS `position: absolute` 以及 `left` 動態賦值達成，並導入 animate.css 來處理選單滑動的效果。
  - **項目渲染**: 使用 recursive component + 條件判斷的應用處理點擊展開時動態生成的項目元素，減少元素渲染數量 (*忽略未展開項目*)。
  - **額外功能**:
    - 歷程記錄: 使用 `localStorage` 記錄當前展開狀態。
    - 下拉選單: 使用 `select` 元素處理需求，並利用 `watch` 同步選取結果與項目展開狀態。

*Github page: https://cyw-allen.github.io/neutec_exam/*