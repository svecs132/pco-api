import * as types from "./types";

export const BASE_URL = "https://api.planningcenteronline.com";

export type Options = { appId: string; secret: string; debug?: boolean };

/**
 * The base class for all the different clients.
 */
export abstract class Client {
  private readonly appId: string;
  private readonly secret: string;
  private debug: boolean;
  abstract readonly baseUrl: string;

  constructor(options: Options) {
    this.appId = options.appId;
    this.secret = options.secret;
    this.debug = options.debug ?? false;
  }

  /**
   * Performs a HTTP request and parses the data.
   *
   * @param path The path to the resource.
   * @internal
   */
  public async fetch<T extends types.AnyResource | types.AnyResource[]>(
    path: string,
    init: RequestInit = {}
  ): Promise<types.Response<T>> {
    const url = `${this.baseUrl}/${path}`;
    if (this.debug) {
      console.debug(`[\x1b[36mDEBUG\x1b[0m] fetch ${url}`);
    }
    while (true) {
      const res = await fetch(url, {
        ...init,
        headers: {
          ...init.headers,
          Authorization: `Basic ${btoa(`${this.appId}:${this.secret}`)}`,
          "Content-Type": "application/json",
        },
      });
      if (res.status === 429) {
        const retryAfter = res.headers.get("Retry-After");
        if (retryAfter) {
          const delay = parseInt(retryAfter, 10);
          if (this.debug) {
            console.debug(
              `[\x1b[36mDEBUG\x1b[0m] Rate limited, retrying in ${delay}s`
            );
          }
          await new Promise((resolve) => setTimeout(resolve, delay * 1000));
          continue;
        } else {
          throw new Error(
            "Rate limit exceeded and no Retry-After header provided"
          );
        }
      }
      if (!res.ok) {
        if (this.debug) {
          console.debug(
            `[\x1b[36mDEBUG\x1b[0m] HTTP error: ${res.status} ${res.statusText}`
          );
        }
        throw new Error(`HTTP error: ${res.status} ${res.statusText}`);
      }
      return (await res.json()) as types.Response<T>;
    }
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

/**
 * Pagination options for collection requests.
 *
 * @internal
 */
export type RequestPagination = {
  offset?: number;
  per_page?: number;
};

/**
 * Converts pagination options to a query string.
 *
 * @param {RequestPagination} p The pagination options.
 * @returns A query string for the pagination options.
 * @internal
 */
export const paginate = (p: RequestPagination) => {
  const params: string[] = [];
  if (p.offset !== undefined) {
    params.push(`offset=${p.offset}`);
  }
  if (p.per_page !== undefined) {
    params.push(`per_page=${p.per_page}`);
  }
  return params.join("&");
};
