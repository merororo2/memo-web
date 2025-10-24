import React from "react";
import type { MemoProps } from "../App";
import "../assets/css/memolist.css";

interface MemoListProps {
  memos: MemoProps[];
  deleteMemo: (index: number) => void;
}

function MemoList({ memos, deleteMemo }: MemoListProps) {
  return (
    <div className="memo_list">
      <h2 className="memo_status">📝 메모리스트 ({memos.length}개)</h2>
      {memos.length === 0 ? (
        <p className="memo_status">메모가 없습니다.</p>
      ) : (
        memos.map((memo, index) => (
          <div key={index} className="memo_item">
            <h3>{memo.title}</h3>
            <p>{memo.content}</p>
            <button onClick={() => deleteMemo(index)}>삭제</button>
          </div>
        ))
      )}
    </div>
  );
}

export default MemoList;
