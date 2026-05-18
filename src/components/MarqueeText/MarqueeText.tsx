// MarqueeText.tsx
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

type MarqueeTextProps = {
  text: string;
  className?: string;
  speed?: number;
};

export default function MarqueeText({
  text,
  className = "",
  speed = 10,
}: MarqueeTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (!containerRef.current || !textRef.current) return;

      setOverflow(
        textRef.current.scrollWidth > containerRef.current.clientWidth
      );
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(checkOverflow);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [text]);

  if (!overflow) {
    return (
      <div
        ref={containerRef}
        className={`${styles.container} ${className}`}
      >
        <div ref={textRef} className={styles.single}>
          {text}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className}`}
    >
      <div
        className={styles.track}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        <div ref={textRef} className={styles.text}>
          {text}
        </div>

        <div className={styles.text}>
          {text}
        </div>
      </div>
    </div>
  );
}