import { Resource, Client } from "./..";
import * as types from "../types/services";

/**
 * A person's email address.
 */
export default class Email extends Resource<types.Email> {
  constructor(client: Client, data: types.Email) {
    super(client, data);
  }

  /**
   * @ignore
   */
  toString(): string {
    return `(\x1b[33mEmail\x1b[0m \x1b[2m:id\x1b[0m ${
      this.id
    } \x1b[2m:address\x1b[0m ${this.attributes.address}${
      this.attributes.primary ? " \x1b[2m:primary\x1b[0m" : ""
    })`;
  }
}
