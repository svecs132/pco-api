import { ServicesClient } from "./mod";

let services = new ServicesClient(
  process.env["PCO_APP_ID"] || "",
  process.env["PCO_SECRET"] || ""
).withDebug();

const folders = await services.getFolders({ per_page: 100 });

console.log(folders.join("\n"));
