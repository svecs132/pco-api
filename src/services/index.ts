import {
  BASE_URL,
  Client,
  type Options,
  type RequestPagination,
  paginate,
} from "./..";
import * as types from "../types";

import Arrangement from "./arrangement";
import Folder from "./folder";
import Item from "./item";
import Organization from "./organization";
import Person from "./person";
import Plan from "./plan";
import ServiceType from "./service_type";
import Song from "./song";

export default class ServicesClient extends Client {
  readonly baseUrl: string = `${BASE_URL}/services/v2`;

  constructor(options: Options) {
    super(options);
  }

  /**
   * Fetches all the folders in the organization.
   *
   * @param {RequestPagination} pagination pagination options for the request
   * @returns {Promise<Folder[]>} a promise that resolves to an array of Folder objects
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
   *
   * @param {string} id the ID of the folder to fetch
   * @returns {Promise<Folder>} a promise that resolves to a Folder object
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
   *
   * @returns {Promise<Organization>} a promise that resolves to an Organization object
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
   *
   * @param {RequestPagination} pagination pagination options for the request
   * @returns {Promise<Person[]>} a promise that resolves to an array of Person objects
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
   *
   * @param {string} id the ID of the person to fetch
   * @returns {Promise<Person>} a promise that resolves to a Person object
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
   *
   * @param {RequestPagination} pagination pagination options for the request
   * @returns {Promise<ServiceType[]>} a promise that resolves to an array of ServiceType objects
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
   *
   * @param {string} id the ID of the service type to fetch
   * @returns {Promise<ServiceType>} a promise that resolves to a ServiceType object
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
   * @param {RequestPagination} pagination pagination options for the request
   * @returns {Promise<Song[]>} a promise that resolves to an array of Song objects
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
   *
   * @param {string} id the ID of the song to fetch
   * @returns {Promise<Song>} a promise that resolves to a Song object
   */
  public async getSong(id: string): Promise<Song> {
    const path = `songs/${id}`;
    const res = await this.fetch<types.Song>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching song: ${res.errors}`);
    }
    return new Song(this, res.data);
  }
}

export {
  Arrangement,
  Folder,
  Item,
  Organization,
  Person,
  Plan,
  ServiceType,
  Song,
};
