import { Resource, Client, type RequestPagination, paginate } from "./..";
import * as types from "../types/services";

import Arrangement from "./Arrangement";

/**
 * A song in the Services API.
 */
export default class Song extends Resource<types.Song> {
  constructor(client: Client, data: types.Song) {
    super(client, data);
  }

  /**
   * @ignore
   */
  toString(): string {
    return `(\x1b[33mSong\x1b[0m \x1b[2m:id\x1b[0m ${this.id} \x1b[2m:title\x1b[0m ${this.attributes.title})`;
  }

  /**
   * Fetches all arrangements for the song.
   *
   * @param {RequestPagination} pagination pagination options for the request
   * @returns {Promise<Arrangement[]>} a promise that resolves to an array of Arrangement objects
   */
  public async getArrangements(
    pagination: RequestPagination = {}
  ): Promise<Arrangement[]> {
    const path = `songs/${this.id}/arrangements?${paginate(pagination)}`;
    const res = await this.client.fetch<types.Arrangement[]>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching arrangements: ${res.errors}`);
    }
    return res.data.map((data) => new Arrangement(this.client, data));
  }

  /**
   * Fetches a specific arrangement by its ID.
   *
   * @param {string} id the ID of the arrangement to fetch
   * @returns {Promise<Arrangement>} a promise that resolves to an Arrangement object
   */
  public async getArrangement(id: string): Promise<Arrangement> {
    const path = `songs/${this.id}/arrangements/${id}`;
    const res = await this.client.fetch<types.Arrangement>(path);
    if ("errors" in res) {
      throw new Error(`Error fetching arrangement: ${res.errors}`);
    }
    return new Arrangement(this.client, res.data);
  }
}
