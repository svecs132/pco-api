import { Resource, Client, type RequestPagination, paginate } from "./..";
import * as types from "../types/services";

import Person from "./person";

export default class Team extends Resource<types.Team> {
  constructor(client: Client, data: types.Team) {
    super(client, data);
  }

  /**
   * @ignore
   */
  toString(): string {
    return `(\x1b[33mTeam\x1b[0m \x1b[2m:id\x1b[0m ${this.id} \x1b[2m:name\x1b[0m ${this.attributes.name})`;
  }

  /**
   * Fetches all the people associated with the team.
   *
   * @param {RequestPagination} pagination pagination options for the request
   * @returns {Promise<Person[]>} a promise that resolves to an array of Person objects
   */
  public async getPeople(
    pagination: RequestPagination = {}
  ): Promise<Person[]> {
    const path = `teams/${this.id}/people?${paginate(pagination)}`;
    const res = await this.client.fetch<types.Person[]>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching people: ${res.errors}`);
    }
    return res.data.map((data) => new Person(this.client, data));
  }
}
