import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import ToolsIndex from "./pages/ToolsIndex";
import ToolRoute from "./pages/ToolRoute";
import ToolRedirect from "./pages/ToolRedirect";



function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-3">
        <h1 className="text-2xl font-bold">Page not found</h1>
        <p className="text-sm text-gray-600">
          That route doesn’t exist. Head back home and pick a tool.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center px-4 py-2 rounded-none bg-black text-white"
        >
          Go home
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/blog" element={<Blog />} />

      {/* Optional tools index route */}
      <Route path="/tools" element={<ToolsIndex />} />

      <Route path="/tool/:slug" element={<ToolRedirect />} />

      {/* Tool routes */}
      <Route path="/tools/:slug" element={<ToolRoute />} />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
