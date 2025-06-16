import { ServicesClient } from "./mod";

let services = new ServicesClient({
  appId: process.env["PCO_APP_ID"] || "",
  secret: process.env["PCO_SECRET"] || "",
});

const songs = await services.getSongs({ per_page: 100 });

console.log(songs.join("\n"));
