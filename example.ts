import ServicesClient from "./mod/services";

let services = new ServicesClient({
  appId: process.env["PCO_APP_ID"] || "",
  secret: process.env["PCO_SECRET"] || "",
});

const team = (await services.getTeams())[0];
const people = await team!.getPeople();

console.log(people.join("\n"));
