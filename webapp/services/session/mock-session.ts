import { IronSession } from "iron-session";
import { Session } from "./get-session";

export let mockSession: IronSession<Session> | undefined = undefined;

export function setMockSession(session: Session) {
  mockSession = {
    ...session,
    destroy: () => { },
    save: async () => { },
    updateConfig: () => { },
  };
}
