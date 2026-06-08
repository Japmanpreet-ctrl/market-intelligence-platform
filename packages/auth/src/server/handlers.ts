import { toNextJsHandler } from "better-auth/next-js";

import { getAuth } from "./auth";

type RouteHandler = (request: Request) => Promise<Response>;

function createLazyAuthHandlers(baseURL?: string) {
  let handlers: ReturnType<typeof toNextJsHandler> | undefined;

  const resolveHandlers = () => {
    if (!handlers) {
      handlers = toNextJsHandler(getAuth(baseURL));
    }

    return handlers;
  };

  const GET: RouteHandler = (request) => resolveHandlers().GET(request);
  const POST: RouteHandler = (request) => resolveHandlers().POST(request);

  return { GET, POST };
}

export function createAuthRouteHandlers(baseURL?: string) {
  return createLazyAuthHandlers(baseURL);
}
