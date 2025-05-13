import { Resource, Client } from "..";
import * as types from "../types";

export class Plan extends Resource<types.Plan> {
  constructor(client: Client, data: types.Plan) {
    super(client, data);
  }
}
