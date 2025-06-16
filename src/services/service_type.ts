import { Resource, Client, type RequestPagination, paginate } from "./..";
import * as types from "../types";

import Plan from "./plan";

export default class ServiceType extends Resource<types.ServiceType> {
  constructor(client: Client, data: types.ServiceType) {
    super(client, data);
  }

  toString(): string {
    return `(\x1b[33mServiceType\x1b[0m \x1b[2m:id\x1b[0m ${this.id} \x1b[2m:title\x1b[0m ${this.attributes.name})`;
  }

  public async getPlans(
    filter: "future" | "past" | "no_dates" | undefined = undefined,
    pagination: RequestPagination = {}
  ): Promise<Plan[]> {
    const path = `service_types/${this.id}/plans?order=sort_date${
      filter ? `&filter=${filter}` : ""
    }&${paginate(pagination)}`;
    const res = await this.client.fetch<types.Plan[]>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching plans: ${res.errors}`);
    }
    return res.data.map((data) => new Plan(this.client, data));
  }

  public async getPlan(id: string): Promise<Plan> {
    const path = `service_types/${this.id}/plans/${id}`;
    const res = await this.client.fetch<types.Plan>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching plan: ${res.errors}`);
    }
    return new Plan(this.client, res.data);
  }
}
