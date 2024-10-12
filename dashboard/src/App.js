// src/App.js
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./pages/global/Topbar";
import Sidebar from "./pages/global/Sidebar";
import Dashboard from "./pages/dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Login from "./pages/login";
import ProtectedRoute from './util/protectedRoute';
import NotFound from "./util/NotFound";
import Members from "./pages/members";
import Event from "./pages/event";
import ExpenseCategory from "./pages/expenseCategory";
import Expense from "./pages/expense";
import Payment from "./pages/payment";
import Role from "./pages/role";
import { useTranslation } from "react-i18next";
import GroupType from "./pages/groupType";
import GroupTypeDetails from "./pages/groupType/groupTypeDetails";
import { SidebarProvider } from './context/SidebarContext'; // Import SidebarProvider
import Footer from "./pages/global/Footer";

function App() {
  const [theme, colorMode] = useMode();
  const { i18n } = useTranslation();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SidebarProvider>
          <div className="app" dir={['ar', 'fa'].includes(i18n.language) ? 'rtl' : 'ltr'} >
            {!isLoginPage && <Sidebar />}
            <main className="content" style={{overflow:'auto',paddingTop: '64px'}}>
              {!isLoginPage && <Topbar />}
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/group-types" element={<ProtectedRoute><GroupType /></ProtectedRoute>} />
                <Route path="/group-types/details/:id" element={<ProtectedRoute><GroupTypeDetails /></ProtectedRoute>} />
                <Route path="/expense-categories" element={<ProtectedRoute><ExpenseCategory /></ProtectedRoute>} />
                <Route path="/members" element={<ProtectedRoute><Members /></ProtectedRoute>} />
                <Route path="/event" element={<ProtectedRoute><Event /></ProtectedRoute>} />
                <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
                <Route path="/expense" element={<ProtectedRoute><Expense /></ProtectedRoute>} />
                <Route path="/role" element={<ProtectedRoute><Role /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
