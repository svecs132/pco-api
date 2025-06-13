import { BASE_URL, Client, type RequestPagination, paginate } from "..";
import * as types from "../types";

import { Folder } from "./folder";
import { Organization } from "./organization";
import { Person } from "./person";
import { ServiceType } from "./service_type";

export class ServicesClient extends Client {
  readonly baseUrl = `${BASE_URL}/services/v2`;

  constructor(appId: string, secret: string) {
    super(appId, secret);
  }

  public async getFolders(pagination: RequestPagination = {}) {
    const path = `folders?${paginate(pagination)}`;
    const res = await this.fetch<types.Folder[]>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching folders: ${res.errors}`);
    }
    return res.data.map((data) => new Folder(this, data));
  }

  public async getOrganization() {
    const path = ``;
    const res = await this.fetch<types.Organization>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching organization: ${res.errors}`);
    }
    return new Organization(this, res.data);
  }

  public async getPeople(pagination: RequestPagination = {}) {
    const path = `people?${paginate(pagination)}`;
    const res = await this.fetch<types.Person[]>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching people: ${res.errors}`);
    }
    return res.data.map((data) => new Person(this, data));
  }

  public async getPerson(id: string) {
    const path = `people/${id}`;
    const res = await this.fetch<types.Person>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching person: ${res.errors}`);
    }
    return new Person(this, res.data);
  }

  public async getServiceTypes(pagination: RequestPagination = {}) {
    const path = `service_types?${paginate(pagination)}`;
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
