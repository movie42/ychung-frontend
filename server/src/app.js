import express from "express";
import morgan from "morgan";
import rootRouter from "./router/root.router";
import worshipRouter from "./router/worship.router";
import noticeRouter from "./router/notice.router";
import api from "./router/api.router";
import userRouter from "./router/user.router";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { locals, csrfProtection } from "./middleWare";
import documentsRouter from "./router/documents.router";
import blogRouter from "./router/blog.router";
import permissionsPolicy from "permissions-policy";
import cors from "cors";

const app = express();

app.use((req, res, next) => {
  if (req.get("X-Forwarded-Proto") == "https" || req.hostname == "localhost") {
    next();
  } else if (
    req.get("X-Forwarded-Proto") != "https" &&
    req.get("X-Forwarded-Port") != "443"
  ) {
    res.redirect(`https://${req.hostname}${req.url}`);
  }
});

app.use(
  cors({
    origin: process.env.CORS_SERVER || "http://localhost:3000",
    credentials: true
  })
);

app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'unsafe-eval'", process.env.URL], //development mode should allow 'unsafe-eval' because eval function
      "img-src": ["'self'", "data:", "https:"],
      "frame-src": "https://www.youtube.com/",
      "font-src": ["data:", "https:"]
    }
  })
);
app.use(
  helmet.hsts({
    maxAge: 31536000,
    preload: true
  })
);
app.use(helmet.xssFilter());
app.use(
  permissionsPolicy({
    features: {
      fullscreen: ["self", '"https://www.youtube.com"'],
      displayCapture: ["self"],
      autoplay: [],
      camera: []
    }
  })
);

app.use(express.static("build"));
app.set("JWT_SECRET", process.env.JWT_SECRET);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(csrfProtection);

app.use("/favicon", express.static("favicon"));
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.use("/", rootRouter);
app.use("/notice", noticeRouter);
app.use("/worship", worshipRouter);
app.use("/documents", documentsRouter);
app.use("/blog", blogRouter);
app.use("/user", userRouter);
app.use("/api", api);

export default app;
