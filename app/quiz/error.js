"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.log(error);
  }, [error]);

  return (
    <div>
      <h3>somthing bad happend</h3>
      <button onClick={() => reset()}>try again</button>
    </div>
  );
}
