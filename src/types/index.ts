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

type RelOne<T extends AnyResource> = {
  data: {
    type: T["type"];
    id: string;
  } | null;
};

type RelMany<T extends AnyResource> = {
  data: {
    type: T["type"];
    id: string;
  }[];
};

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
 */
export type AnyResource = AnyServicesResource;
