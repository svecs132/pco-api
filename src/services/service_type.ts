import { Resource, Client } from "..";
import * as types from "../types";

import { Plan } from "./plan";

export class ServiceType extends Resource<types.ServiceType> {
  constructor(client: Client, data: types.ServiceType) {
    super(client, data);
  }

  public async getPlans(
    filter: "future" | "past" | "no_dates" | undefined = undefined
  ) {
    const path = `service_types/${this.id}/plans?order=sort_date${
      filter ? `&filter=${filter}` : ""
    }`;
    const res = await this.client.fetch<types.Plan[]>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching plans: ${res.errors}`);
    }
    return res.data.map((data) => new Plan(this.client, data));
  }
}
