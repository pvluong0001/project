import {ApiApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
import {RestServer} from "@loopback/rest";

export {ApiApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new ApiApplication(options);
  const server = await app.getServer(RestServer);
  server.basePath('/v1')
  server.bind('rest.port').to(process.env.PORT);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
