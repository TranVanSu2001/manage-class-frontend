import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import { publicRoutes } from "@/routes";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            const Layout =
              route.path === "/" ||
              route.path === "/signin" ||
              route.path === "/signup"
                ? Fragment
                : DefaultLayout;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout key={route.path}>
                    <Page key={route.path} />
                  </Layout>
                }
              />
            );
          })}
          {/* <Route path="/" element={<div>132</div>} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
