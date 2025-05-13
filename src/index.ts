import * as types from "./types";

export const BASE_URL = "https://api.planningcenteronline.com";

export abstract class Client {
  private appId: string;
  private secret: string;
  abstract readonly baseUrl: string;

  constructor(appId: string, secret: string) {
    if (!appId || !secret) {
      throw new Error("App ID and Secret are required");
    } else if (appId.length !== 64 || secret.length !== 64) {
      throw new Error("App ID and Secret must be 64 characters long");
    }

    this.appId = appId;
    this.secret = secret;
  }

  /**
   * Performs a HTTP request and parses the data.
   *
   * @internal
   * @param path The path to the resource.
   */
  public async fetch<T extends types.AnyResource | types.AnyResource[]>(
    path: string,
    init: RequestInit = {}
  ): Promise<types.Response<T>> {
    const url = `${this.baseUrl}/${path}`;
    const res = await fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        Authorization: `Basic ${btoa(`${this.appId}:${this.secret}`)}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status} ${res.statusText}`);
    }
    return (await res.json()) as types.Response<T>;
  }
}

export abstract class Resource<T extends types.AnyResource> {
  constructor(protected client: Client, protected data: T) {}

  toString(): string {
    return `(\x1b[33m${this.data.type}\x1b[0m \x1b[2m:id\x1b[0m ${this.id})`;
  }

  public get id(): string {
    return this.data.id;
  }

  public get attributes(): T["attributes"] {
    return this.data.attributes;
  }

  public get relationships(): T["relationships"] {
    return this.data.relationships;
  }
}
