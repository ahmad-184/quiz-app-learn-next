"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <p>error message: {error.message}</p>
      <button onClick={reset}>reset</button>
    </div>
  );
}
