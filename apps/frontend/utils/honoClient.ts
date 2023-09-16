import type { AppType } from "backend";
import { hc } from "hono/client";

const client = hc<AppType>("https://my-app.elyeser-f.workers.dev");

export default client;
