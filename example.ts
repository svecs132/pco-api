import { ServicesClient } from "./mod";

let services = new ServicesClient(
  process.env["PCO_APP_ID"] || "",
  process.env["PCO_SECRET"] || ""
).withDebug();

const people = await services.getPeople({ per_page: 100 });

console.log(people.join("\n"));
