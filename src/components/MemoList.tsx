import React from "react";
import type { MemoProps } from "../App";
import "../assets/css/memolist.css";

interface MemoListProps {
  memos: MemoProps[];
  deleteMemo: (index: number) => void;
  onEdit: (index: number) => void;
}

function MemoList({ memos, deleteMemo, onEdit }: MemoListProps) {
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
            <div className="memo_action_container">
              <div className="memo_actions">
                <button className="edit_btn" onClick={() => onEdit(index)}>
                  수정
                </button>
                <button
                  className="delete_btn"
                  onClick={() => deleteMemo(index)}
                >
                  삭제
                </button>
              </div>
              <small
                className={`memo_date ${memo.updatedAt ? "edited" : "created"}`}
              >
                <span className="label">
                  {memo.updatedAt ? "수정" : "작성"}
                </span>
                <span className="date">
                  {new Date(memo.updatedAt ?? memo.createdAt).toLocaleString(
                    "ko-KR"
                  )}
                </span>
              </small>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MemoList;
