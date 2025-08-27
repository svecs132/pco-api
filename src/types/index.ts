import type { AnyResource as AnyServicesResource } from "./services";

/**
 * Type of the response from the PCO API.
 * @internal
 */
export type Response<Resource extends AnyResource | AnyResource[]> =
  | {
      data: Resource;
      included: AnyResource[];
      meta?: {
        [key: string]: unknown;
      };
    }
  | {
      errors: {
        code: string;
        detail: string;
        status: string;
      }[];
    };

/**
 * A helper type for constructing one-to-one relationship types.
 * @internal
 */
type RelOne<T extends AnyResource> = {
  data: {
    type: T["type"];
    id: string;
  } | null;
};

/**
 * A helper type for constructing one-to-many relationship types.
 * @internal
 */
type RelMany<T extends AnyResource> = {
  data: {
    type: T["type"];
    id: string;
  }[];
};

/**
 * A helper type for the links field of resources, just a map from a key to an url string.
 * @internal
 */
type Links = {
  self: string;
  [key: string]: string;
};

/**
 * A type for constructing resource types from attributes and relationships.
 * @internal
 */
export type Resource<
  Type extends string,
  Attributes extends { [S: string]: unknown },
  Relationships extends
    | { [S: string]: AnyResource | AnyResource[] }
    | undefined = undefined
> = {
  type: Type;
  id: string;
  attributes: Attributes;
  links: Links;
  relationships: Relationships extends undefined
    ? undefined
    : {
        [Rel in keyof Relationships]: Relationships[Rel] extends AnyResource[]
          ? RelMany<Relationships[Rel][number]>
          : Relationships[Rel] extends AnyResource
          ? RelOne<Relationships[Rel]>
          : never;
      };
};

/**
 * A union type representing any resource in the PCO API.
 * @internal
 */
export type AnyResource = AnyServicesResource;
