import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ExpandedQuestionPage from "./pages/ExpandedQuestionPage";
import ErrorPage from "./pages/NotFoundPage";
import { PersistGate } from "redux-persist/integration/react";
import { persistedStore } from "./store/store";
import UsersPage from "./pages/UsersPage";
import QuestionsPage from "./pages/QuestionsPage";
import App from "./App";
import HomePage from "./pages/HomePage";

const NotImplemented = () => {
  return <div>Not Implemented yet</div>;
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Navigate to={"/home"} />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "questions",
        element: <QuestionsPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "myAccount",
        element: <NotImplemented />,
      },
      {
        path: "questions/:questionId",
        element: <ExpandedQuestionPage />,
      },
    ],
  },
]);

root.render(
  <Provider store={persistedStore.store}>
    <PersistGate persistor={persistedStore.persistor}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
