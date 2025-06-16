import { Resource, Client } from "./..";
import * as types from "../types";

export default class Arrangement extends Resource<types.Arrangement> {
  constructor(client: Client, data: types.Arrangement) {
    super(client, data);
  }

  toString(): string {
    return `(\x1b[33mArrangement\x1b[0m \x1b[2m:id\x1b[0m ${this.id} \x1b[2m:name\x1b[0m ${this.attributes.name})`;
  }
}
