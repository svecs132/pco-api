import { Resource, Client, type RequestPagination, paginate } from "./..";
import * as types from "../types/services";

import Email from "./Email";

/**
 * A person in the Services API.
 */
export default class Person extends Resource<types.Person> {
  constructor(client: Client, data: types.Person) {
    super(client, data);
  }

  /**
   * @ignore
   */
  toString(): string {
    return `(\x1b[33mPerson\x1b[0m \x1b[2m:id\x1b[0m ${this.id} \x1b[2m:full_name\x1b[0m ${this.attributes.full_name})`;
  }

  /**
   * Fetches person's email addresses.
   */
  public async getEmails(pagination: RequestPagination = {}): Promise<Email[]> {
    const path = `people/${this.id}/emails?${paginate(pagination)}`;
    const res = await this.client.fetch<types.Email[]>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching emails: ${res.errors}`);
    }
    return res.data.map((data) => new Email(this.client, data));
  }

  /**
   * Fetches a specific email address by its ID.
   */
  public async getEmail(id: string): Promise<Email> {
    const path = `people/${this.id}/emails/${id}`;
    const res = await this.client.fetch<types.Email>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching email: ${res.errors}`);
    }
    return new Email(this.client, res.data);
  }
}
