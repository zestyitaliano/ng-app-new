import React from "react";
import { Navigate, useParams } from "react-router-dom";

export default function ToolRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={slug ? `/tools/${slug}` : "/tools"} replace />;
}
