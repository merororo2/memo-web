import { useEffect, useState } from "react";
import type { ToastItem } from "../App";
import "../assets/css/toast.css";

function Toast({
  toast,
  onRemove,
}: {
  toast: ToastItem;
  onRemove: (id: number) => void;
}) {
  const { id, message, type, duration = 2500 } = toast;
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = 10;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          onRemove(id);
          return 0;
        }
        return prev - step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration, id, onRemove]);

  return (
    <div className={`toast ${type} show`}>
      <div className="toast_message">{message}</div>
      <div className="toast_progress" style={{ width: `${progress}%` }}></div>
    </div>
  );
}

export default Toast;
