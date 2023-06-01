import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Theme } from "react-daisyui";

import "./index.css";
import App from "./App";
import Topbar from "./layout/Topbar";
import "./i18n";

window.onload = () => window.sessionStorage.clear();

const queryClient = new QueryClient();

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
  ],
  {
    basename: process.env.PUBLIC_URL ? "/courses/bioinformatics-exam" : "",
  }
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Theme dataTheme="light">
          <Topbar>
            <RouterProvider router={router} />
          </Topbar>
        </Theme>
      </div>
    </QueryClientProvider>
  </React.StrictMode>
);
