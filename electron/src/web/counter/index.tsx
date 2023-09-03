import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <h1>{count}</h1>
      <button onClick={() => setCount((count) => count + 1)}>Count</button>
      <button onClick={() => setCount(() => 0)}>Reset</button>
    </div>
  );
};
