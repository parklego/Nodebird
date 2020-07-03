const backUrl =
  process.env.NODE_ENV === "production"
    ? "http://api.bathingape.ga"
    : "http://localhost:8080";

export { backUrl };
