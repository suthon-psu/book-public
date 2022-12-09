import { useEffect, useRef, useState } from "react";

function RefHookSample() {
  const [count, setCount] = useState(0);
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <p>Input: {input.current?.value}</p>
      <input type="text" ref={input} />
    </div>
  );
}

export default RefHookSample;