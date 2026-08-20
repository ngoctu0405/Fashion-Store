import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Products from "../pages/Products/Products";
import MauAo from "../pages/Products/MauAo";
import MauQuan from "../pages/Products/MauQuan";
import SetDo from "../pages/Products/SetDo";
import PhuKien from "../pages/Products/PhuKien";
import Promotions from "../pages/Promotions/Promotions";
import Policies from "../pages/Policies/Policies";
import CustomerBenefits from "../pages/CustomerBenefits/CustomerBenefits";
import PointsProgram from "../pages/CustomerBenefits/PointsProgram";
import RewardsProgram from "../pages/CustomerBenefits/RewardsProgram";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route
        path="/about"
        element={
          <MainLayout>
            <About />
          </MainLayout>
        }
      />

      <Route
        path="/products"
        element={
          <MainLayout>
            <Products />
          </MainLayout>
        }
      />
      <Route
        path="/products/ao"
        element={
          <MainLayout>
            <MauAo />
          </MainLayout>
        }
      />
      <Route
        path="/products/quan"
        element={
          <MainLayout>
            <MauQuan />
          </MainLayout>
        }
      />
      <Route
        path="/products/set"
        element={
          <MainLayout>
            <SetDo />
          </MainLayout>
        }
      />
      <Route
        path="/products/phu-kien"
        element={
          <MainLayout>
            <PhuKien />
          </MainLayout>
        }
      />

      <Route
        path="/promotions"
        element={
          <MainLayout>
            <Promotions />
          </MainLayout>
        }
      />
      {[
        "/exchange-policy",
        "/membership-policy",
        "/privacy-policy",
        "/shipping-policy",
      ].map((path) => (
        <Route key={path} path={path} element={<MainLayout><Policies /></MainLayout>} />
      ))}
      <Route path="/customer-benefits" element={<MainLayout><CustomerBenefits /></MainLayout>} />
      <Route path="/points-program" element={<MainLayout><PointsProgram /></MainLayout>} />
      <Route path="/rewards-program" element={<MainLayout><RewardsProgram /></MainLayout>} />
    </Routes>
  );
}

export default AppRoutes;
