import { AuthPayload } from "./AuthPayload";

export type RequestWithAuthPayload = Request & {user: AuthPayload}