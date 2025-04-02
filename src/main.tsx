import ReactDOM from "react-dom/client";

import "@/styles/globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import { queryClient } from "./lib/query-client.tsx";
import { setupAxiosInterceptors } from "./services/axios-instance.ts";

setupAxiosInterceptors(queryClient)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
