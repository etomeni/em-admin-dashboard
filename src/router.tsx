import { createBrowserRouter, Navigate } from "react-router-dom";

import ScrollToTop from "@/components/ScrollToTop.tsx";
import NotFoundPage from '@/pages/NotFound.tsx';

import AuthLayout from "@/pages/auth/AuthLayout.tsx";
import Login from '@/pages/auth/Login.tsx';
import ForgotPassword from "@/pages/auth/ForgotPassword.tsx";
import VerifyEmail from "@/pages/auth/VerifyEmail.tsx";
import CreateNewPassword from "@/pages/auth/CreateNewPassword.tsx";

import AccountLayout from "./pages/account/AccountLayout";
import Dashboard from "./pages/sunday/Dashboard";
import UsersPage from "./pages/sunday/users/Users";
import UserDetailsPage from "./pages/sunday/users/UserDetails";
import UserDytTokenTransactionsPage from "./pages/sunday/users/UserDytTokenTransactions";
import UserStickerTransactionsPage from "./pages/sunday/users/UserStickerTransactions";
import NotificationPage from "./pages/sunday/NotificationPage";
import UserTransactionHistoryPage from "./pages/sunday/users/UserTransactionHistory";
import UserDetailsEditProfilePage from "./pages/sunday/users/UserDetailsEdit";
import ProductsPage from "./pages/sunday/products/Products";
import AdManagerPage from "./pages/sunday/AdManager/AdManager";
import AdReviewDetailsPage from "./pages/sunday/AdManager/AdReviewDetails";
import LiveAdDetailsPage from "./pages/sunday/AdManager/LiveAdDetails";
import NewEditAdDetailsPage from "./pages/sunday/AdManager/NewEditAdDetails";




export const router = createBrowserRouter([
    {
      path: "/",
      element: <ScrollToTop />,
      children: [
        {
          path: "",
          element: <Navigate replace to={"/auth/login"} />,
        },
        {
          path: "auth",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <Login />
            },
            {
              path: "login",
              element: <Login />
            },
            {
              path: "forgot-password",
              element: <ForgotPassword />
            },
            {
              path: "verify-email",
              element: <VerifyEmail />
            },
            {
              path: "create-new-password",
              element: <CreateNewPassword />
            },
          ]
        },


        {
          path: "admin",
          element: <AccountLayout />,
          children: [
            {
              path: "",
              element: <Dashboard />
            },
            {
              path: "notifications",
              element: <NotificationPage />
            },

            {
              path: "users",
              // element: <AccountLayout />,
              children: [
                {
                  path: "",
                  element: <UsersPage />
                },
                {
                  path: ":id",
                  element: <UserDetailsPage />
                },
                {
                  path: ":id/edit",
                  element: <UserDetailsEditProfilePage />
                },
                {
                  path: ":id/dyt-token-transactions",
                  element: <UserDytTokenTransactionsPage />
                },
                {
                  path: ":id/sticker-transactions",
                  element: <UserStickerTransactionsPage />
                },
                {
                  path: ":id/transaction-history",
                  element: <UserTransactionHistoryPage />
                },
              ]
            },

            {
              path: "products",
              // element: <AccountLayout />,
              children: [
                {
                  path: "",
                  element: <ProductsPage />
                },
              ]
            },

            {
              path: "ad-manager",
              // element: <AccountLayout />,
              children: [
                {
                  path: "",
                  element: <AdManagerPage />
                },
                {
                  path: "review-details",
                  element: <AdReviewDetailsPage />
                },
                {
                  path: "live-details",
                  element: <LiveAdDetailsPage />
                },
                {
                  path: "edit/:id",
                  element: <NewEditAdDetailsPage />
                },
                {
                  path: "new",
                  element: <NewEditAdDetailsPage />
                },
              ]
            },
            
            
          ]
        }

      ]
    },

    {
      path: "*",
      element: <NotFoundPage />
    }
]);