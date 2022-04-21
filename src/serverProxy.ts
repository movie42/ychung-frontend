import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app: any) {
  app.use(
    "/",
    createProxyMiddleware({
      target: "http://localhost:4000",
      changeOrigin: true,
    })
  );
}
