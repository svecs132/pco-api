import { Resource, Client } from "./..";
import * as types from "../types/services";

export default class Organization extends Resource<types.Organization> {
  constructor(client: Client, data: types.Organization) {
    super(client, data);
  }

  toString(): string {
    return `(\x1b[33mOrganization\x1b[0m \x1b[2m:id\x1b[0m ${this.id} \x1b[2m:name\x1b[0m ${this.attributes.name})`;
  }
}
