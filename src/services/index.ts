import {
  BASE_URL,
  Client,
  type Options,
  type RequestPagination,
  paginate,
} from "./..";
import * as types from "../types/services";

import Folder from "./Folder";
import Organization from "./Organization";
import Person from "./Person";
import ServiceType from "./ServiceType";
import Song from "./Song";
import Team from "./Team";

/**
 * A client for the PCO Services API.
 */
export class ServicesClient extends Client {
  /**
   * Base URL of the sub-API.
   *
   * @internal
   */
  readonly baseUrl: string = `${BASE_URL}/services/v2`;

  constructor(options: Options) {
    super(options);
  }

  /**
   * Fetches all the folders in the organization.
   */
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

  /**
   * Fetches a specific folder by its ID.
   */
  public async getFolder(id: string): Promise<Folder> {
    const path = `folders/${id}`;
    const res = await this.fetch<types.Folder>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching folder: ${res.errors}`);
    }
    return new Folder(this, res.data);
  }

  /**
   * Fetches the organization associated with the API credentials.
   */
  public async getOrganization(): Promise<Organization> {
    const path = ``;
    const res = await this.fetch<types.Organization>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching organization: ${res.errors}`);
    }
    return new Organization(this, res.data);
  }

  /**
   * Fetches all the people in the organization.
   */
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

  /**
   * Fetches a specific person by their ID.
   */
  public async getPerson(id: string): Promise<Person> {
    const path = `people/${id}`;
    const res = await this.fetch<types.Person>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching person: ${res.errors}`);
    }
    return new Person(this, res.data);
  }

  /**
   * Fetches all the service types in the organization.
   */
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

  /**
   * Fetches a specific service type by its ID.
   */
  public async getServiceType(id: string): Promise<ServiceType> {
    const path = `service_types/${id}`;
    const res = await this.fetch<types.ServiceType>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching service type: ${res.errors}`);
    }
    return new ServiceType(this, res.data);
  }

  /**
   * Fetches all the songs in the organization.
   */
  public async getSongs(pagination: RequestPagination = {}): Promise<Song[]> {
    const path = `songs?${paginate(pagination)}`;
    const res = await this.fetch<types.Song[]>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching songs: ${res.errors}`);
    }
    return res.data.map((data) => new Song(this, data));
  }

  /**
   * Fetches a specific song by its ID.
   */
  public async getSong(id: string): Promise<Song> {
    const path = `songs/${id}`;
    const res = await this.fetch<types.Song>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching song: ${res.errors}`);
    }
    return new Song(this, res.data);
  }

  /**
   * Fetches all the teams in the organization.
   */
  public async getTeams(pagination: RequestPagination = {}): Promise<Team[]> {
    const path = `teams?${paginate(pagination)}`;
    const res = await this.fetch<types.Team[]>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching teams: ${res.errors}`);
    }
    return res.data.map((data) => new Team(this, data));
  }

  /**
   * Fetches a specific team by its ID.
   */
  public async getTeam(id: string): Promise<Team> {
    const path = `teams/${id}`;
    const res = await this.fetch<types.Team>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching team: ${res.errors}`);
    }
    return new Team(this, res.data);
  }
}
