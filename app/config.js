const config = {
  API_URL:
    window.location.hostname == "localhost" ||
    window.location.hostname === "127.0.0.1"
      ? "http://localhost:4000"
      : "https://flower-shop-delivery-btd7.onrender.com",
};

export default config;
