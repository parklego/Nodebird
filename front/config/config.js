const backUrl =
  process.env.NODE_ENV === "production"
    ? "http://54.180.169.69"
    : "http://localhost:8080";

export { backUrl };
