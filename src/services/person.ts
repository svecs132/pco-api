import { Resource, Client } from "..";
import * as types from "../types";

export class Person extends Resource<types.Person> {
  constructor(client: Client, data: types.Person) {
    super(client, data);
  }

  toString(): string {
    return `(\x1b[33mPerson\x1b[0m \x1b[2m:id\x1b[0m ${this.id} \x1b[2m:full_name\x1b[0m ${this.attributes.full_name})`;
  }
}
