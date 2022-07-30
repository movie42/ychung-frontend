import express from "express";
import morgan from "morgan";
import api from "./router/api.router";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { csrfProtection } from "./middleWare";
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

const allowList = [
  process.env.CORS_SERVER,
  "https://yangchung.s3.amazonaws.com",
  "https://www.youtube.com"
];

const corsOptionDelegate = (req, callback) => {
  let corsOptions;
  if (allowList.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

app.use(cors(corsOptionDelegate));

app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": [process.env.URL],
      "img-src": [
        "'self'",
        "data:",
        "https:",
        "https://yangchung.s3.amazonaws.com"
      ],
      "frame-src": "https://www.youtube.com",
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
app.use(
  helmet.frameguard({
    action: "deny"
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

app.use((req, res, next) => {
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  res.header("Cross-Origin-Embedder-Policy", "credentialless");
  next();
});

app.use(express.static("build"));

app.set("JWT_SECRET", process.env.JWT_SECRET);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(csrfProtection);

app.use("/favicon", express.static("favicon"));
app.use("/uploads", express.static("uploads"));

app.use("/api", api);

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

export default app;
