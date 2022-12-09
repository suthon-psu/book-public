import { useEffect, useState } from "react";

function EffectHookSample() {
  const [count, setCount] = useState(0);
  const [resetCount, setResetCount] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => setCount(100), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <p>Reset Count: {resetCount}</p>
      <button onClick={() => setResetCount(resetCount + 1)}>
        Click me
      </button>
    </div>
  );
}

export default EffectHookSample;