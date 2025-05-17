import { BASE_URL, Client } from "..";
import * as types from "../types";

import { Organization } from "./organization";
import { ServiceType } from "./service_type";

export class ServicesClient extends Client {
  readonly baseUrl = `${BASE_URL}/services/v2`;

  constructor(appId: string, secret: string) {
    super(appId, secret);
  }

  public async getOrganization() {
    const path = `/`;
    const res = await this.fetch<types.Organization>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching organization: ${res.errors}`);
    }
    return new Organization(this, res.data);
  }

  public async getServiceTypes() {
    const path = `service_types`;
    const res = await this.fetch<types.ServiceType[]>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching service types: ${res.errors}`);
    }
    return res.data.map((data) => new ServiceType(this, data));
  }

  public async getServiceType(id: string) {
    const path = `service_types/${id}`;
    const res = await this.fetch<types.ServiceType>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching service type: ${res.errors}`);
    }
    return new ServiceType(this, res.data);
  }
}
