import { Resource, Client, type RequestPagination, paginate } from "./..";
import * as types from "../types/services";

import Person from "./Person";
import ServiceType from "./ServiceType";
import TeamLeader from "./TeamLeader";

/**
 * A team in the Services API.
 */
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

  /**
   * Fetches all the service types associated with the team.
   *
   * @param {RequestPagination} pagination pagination options for the request
   * @returns {Promise<ServiceType[]>} a promise that resolves to an array of ServiceType objects
   */
  public async getServiceTypes(
    pagination: RequestPagination = {}
  ): Promise<ServiceType[]> {
    const path = `teams/${this.id}/service_types?${paginate(pagination)}`;
    const res = await this.client.fetch<types.ServiceType[]>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching service types: ${res.errors}`);
    }
    return res.data.map((data) => new ServiceType(this.client, data));
  }

  /**
   * Fetches all the team leaders associated with the team.
   *
   * @param {RequestPagination} pagination pagination options for the request
   * @returns {Promise<TeamLeader[]>} a promise that resolves to an array of TeamLeader objects
   */
  public async getTeamLeaders(
    pagination: RequestPagination = {}
  ): Promise<TeamLeader[]> {
    const path = `teams/${this.id}/team_leaders?${paginate(pagination)}`;
    const res = await this.client.fetch<types.TeamLeader[]>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching team leaders: ${res.errors}`);
    }
    return res.data.map((data) => new TeamLeader(this.client, data));
  }
}
