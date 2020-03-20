import Routes from "./routes";
import * as Hapi from "@hapi/hapi";

export function init(
  server: Hapi.Server,
) {
  Routes(server);
}