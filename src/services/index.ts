import {
  BASE_URL,
  Client,
  type Options,
  type RequestPagination,
  paginate,
} from "./..";
import * as types from "../types";

import { Folder } from "./folder";
import { Organization } from "./organization";
import { Person } from "./person";
import { ServiceType } from "./service_type";

export class ServicesClient extends Client {
  readonly baseUrl: string = `${BASE_URL}/services/v2`;

  constructor(options: Options) {
    super(options);
  }

  public async getFolders(
    pagination: RequestPagination = {}
  ): Promise<Folder[]> {
    const path = `folders?${paginate(pagination)}`;
    const res = await this.fetch<types.Folder[]>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching folders: ${res.errors}`);
    }
    return res.data.map((data) => new Folder(this, data));
  }

  public async getOrganization(): Promise<Organization> {
    const path = ``;
    const res = await this.fetch<types.Organization>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching organization: ${res.errors}`);
    }
    return new Organization(this, res.data);
  }

  public async getPeople(
    pagination: RequestPagination = {}
  ): Promise<Person[]> {
    const path = `people?${paginate(pagination)}`;
    const res = await this.fetch<types.Person[]>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching people: ${res.errors}`);
    }
    return res.data.map((data) => new Person(this, data));
  }

  public async getPerson(id: string): Promise<Person> {
    const path = `people/${id}`;
    const res = await this.fetch<types.Person>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching person: ${res.errors}`);
    }
    return new Person(this, res.data);
  }

  public async getServiceTypes(
    pagination: RequestPagination = {}
  ): Promise<ServiceType[]> {
    const path = `service_types?${paginate(pagination)}`;
    const res = await this.fetch<types.ServiceType[]>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching service types: ${res.errors}`);
    }
    return res.data.map((data) => new ServiceType(this, data));
  }

  public async getServiceType(id: string): Promise<ServiceType> {
    const path = `service_types/${id}`;
    const res = await this.fetch<types.ServiceType>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching service type: ${res.errors}`);
    }
    return new ServiceType(this, res.data);
  }
}
