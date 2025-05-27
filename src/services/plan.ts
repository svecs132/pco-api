import { Resource, Client, type RequestPagination, paginate } from "..";
import * as types from "../types";

import { Item } from "./item";

export class Plan extends Resource<types.Plan> {
  private serviceTypeId: string;

  constructor(client: Client, data: types.Plan) {
    super(client, data);
    this.serviceTypeId = data.relationships.service_type.data!.id;
  }

  toString(): string {
    return `(\x1b[33mPlan\x1b[0m \x1b[2m:id\x1b[0m ${this.id} \x1b[2m:dates\x1b[0m ${this.attributes.dates})`;
  }

  public async getItems(pagination: RequestPagination = {}) {
    const path = `service_types/${this.serviceTypeId}/plans/${
      this.id
    }/items?${paginate(pagination)}`;
    const res = await this.client.fetch<types.Item[]>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching items: ${res.errors}`);
    }
    return res.data.map((data) => new Item(this.client, data));
  }
}
