import { BASE_URL, Client } from "..";
import * as t from "../types";

import { ServiceType } from "./service_type";

export class ServicesClient extends Client {
  readonly baseUrl = `${BASE_URL}/services/v2`;

  constructor(appId: string, secret: string) {
    super(appId, secret);
  }

  public async getServiceTypes() {
    const res = await this.fetch<t.ServiceType[]>("service_types");
    if ("errors" in res) {
      throw new Error(`Error fetching service types: ${res.errors}`);
    }
    return res.data.map((data) => new ServiceType(this, data));
  }

  public async getServiceType(id: string) {
    const res = await this.fetch<t.ServiceType>(`service_types/${id}`);
    if ("errors" in res) {
      throw new Error(`Error fetching service type: ${res.errors}`);
    }
    return new ServiceType(this, res.data);
  }
}
