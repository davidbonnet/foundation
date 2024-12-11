import { Server } from "./components.js";

export function App() {
  return (
    <>
      <h1 class="text-center text-9xl font-extralight text-blue-500">
        Foundation
      </h1>
      <h3 class="text-center text-2xl font-normal">
        <Server />
      </h3>
    </>
  );
}
