import { Resource, Client, type RequestPagination, paginate } from "..";
import * as types from "../types";

import { ServiceType } from "./service_type";

export class Folder extends Resource<types.Folder> {
  constructor(client: Client, data: types.Folder) {
    super(client, data);
  }

  toString(): string {
    return `(\x1b[33mFolder\x1b[0m \x1b[2m:id\x1b[0m ${this.id} \x1b[2m:name\x1b[0m ${this.attributes.name})`;
  }

  public async getServiceTypes(pagination: RequestPagination = {}) {
    const path = `folders/${this.id}/service_types?${paginate(pagination)}`;
    const res = await this.client.fetch<types.ServiceType[]>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching service types: ${res.errors}`);
    }
    return res.data.map((data) => new ServiceType(this.client, data));
  }
}
