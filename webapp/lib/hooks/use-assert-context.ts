import { createContext, useContext } from "react";
import { assert } from "../error";

export const AssertClientContext = createContext<boolean>(false);

export function useAssertClientContext() {
    const context = useContext(AssertClientContext);
    assert(context, "Please wrap your component with ClientContext");
}