import type { AppType } from "backend";
import { hc } from "hono/client";

const client = hc<AppType>(process.env.NEXT_PUBLIC_API_ENDPOINT || "");

export default client;
