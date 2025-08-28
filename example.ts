import ServicesClient from "./mod/services";

let services = new ServicesClient({
  appId: process.env["PCO_APP_ID"] || "",
  secret: process.env["PCO_SECRET"] || "",
});

const teams = await services.getTeams();
const leaders = await teams[0]!.getTeamLeaders();

for (const l of leaders) {
  console.log((await l.getPerson()).toString());
}
