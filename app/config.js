const config = {
  API_URL:
    window.location.hostname == "localhost"
      ? "http://localhost:4000/"
      : "https://flower-shop-ld2e.onrender.com",
};

export default config;
