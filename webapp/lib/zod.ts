import { z } from "zod";

export const stringToInt = z.string().regex(/^\d+$/).transform(Number);
