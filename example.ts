import { ServicesClient } from "./src/services";

let services = new ServicesClient(
  process.env["PCO_APP_ID"] || "",
  process.env["PCO_SECRET"] || ""
);

const serviceTypes = await services.getServiceTypes();

for (const st of serviceTypes) {
  console.log(`${st}`);
  const plans = await st.getPlans("future");
  for (const plan of plans) {
    console.log(`  ${plan}`);
    const items = await plan.getItems();
    for (const item of items) {
      console.log(`    ${item}`);
    }
  }
}
