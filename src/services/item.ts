import { Resource, Client } from "..";
import * as types from "../types";

export class Item extends Resource<types.Item> {
  constructor(client: Client, data: types.Item) {
    super(client, data);
  }

  toString(): string {
    return `(\x1b[33mItem\x1b[0m \x1b[2m:id\x1b[0m ${this.id} \x1b[2m:title\x1b[0m ${this.attributes.title})`;
  }
}
