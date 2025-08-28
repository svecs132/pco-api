import { Resource, Client, type RequestPagination, paginate } from "./..";
import * as types from "../types/services";

import ServiceType from "./service_type";

/**
 * A folder of service types.
 */
export default class Folder extends Resource<types.Folder> {
  constructor(client: Client, data: types.Folder) {
    super(client, data);
  }

  /**
   * @ignore
   */
  toString(): string {
    return `(\x1b[33mFolder\x1b[0m \x1b[2m:id\x1b[0m ${this.id} \x1b[2m:name\x1b[0m ${this.attributes.name})`;
  }

  /**
   * Fetches all the service types in the folder.
   *
   * @param {RequestPagination} pagination pagination options for the request
   * @returns {Promise<ServiceType[]>} a promise that resolves to an array of ServiceType objects
   */
  public async getServiceTypes(
    pagination: RequestPagination = {}
  ): Promise<ServiceType[]> {
    const path = `folders/${this.id}/service_types?${paginate(pagination)}`;
    const res = await this.client.fetch<types.ServiceType[]>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching service types: ${res.errors}`);
    }
    return res.data.map((data) => new ServiceType(this.client, data));
  }
}
