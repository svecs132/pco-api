import { Resource, Client } from "./..";
import * as types from "../types/services";

import Person from "./Person";
import Team from "./Team";

/**
 * A team leader in the Services API.
 */
export default class TeamLeader extends Resource<types.TeamLeader> {
  constructor(client: Client, data: types.TeamLeader) {
    super(client, data);
  }

  /**
   * @ignore
   */
  toString(): string {
    return `(\x1b[33mTeamLeader\x1b[0m \x1b[2m:id\x1b[0m ${this.id})`;
  }

  /**
   * Fetches the person associated with the team leader position.
   */
  public async getPerson(): Promise<Person> {
    if (!this.relationships.person.data) {
      throw new Error("No person relationship found");
    }
    const path = `people/${this.relationships.person.data.id}`;
    const res = await this.client.fetch<types.Person>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching person: ${res.errors}`);
    }
    return new Person(this.client, res.data);
  }

  /**
   * Fetches the team this team leader belongs to.
   */
  public async getTeam(): Promise<Team> {
    if (!this.relationships.team.data) {
      throw new Error("No team relationship found");
    }
    const path = `teams/${this.relationships.team.data.id}`;
    const res = await this.client.fetch<types.Team>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching team: ${res.errors}`);
    }
    return new Team(this.client, res.data);
  }
}
