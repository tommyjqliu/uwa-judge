import { Permission } from "@prisma/client";
import { getSession } from "../services/session/get-session";
import { hasPermission, serverHasPermission } from "./permission";

export enum ErrorType {
  ParamsInvalidError = "ParamsInvalidError",
  PermissionError = "PermissionError",
  NotFoundError = "NotFoundError",
}

export const ParamsInvalidError = ErrorType.ParamsInvalidError;
export const PermissionError = ErrorType.PermissionError;
export const NotFoundError = ErrorType.NotFoundError;

export function assert(
  condition: unknown,
  message: string = "Unnamed error",
  errorType?: ErrorType,
): asserts condition {
  if (!condition) {
    const error = new Error(message);
    if (errorType) {
      error.name = errorType;
    }
    throw error;
  }
}

export function assertParams(
  condition: unknown,
  message: string = "Params invalid",
): asserts condition {
  assert(condition, message, ErrorType.ParamsInvalidError);
}

export async function assertPermission(
  requires: Permission[] | Permission,
  message: string = "Permission denied",
) {
  const condition = await serverHasPermission(requires);
  assert(condition, message, ErrorType.PermissionError);
}

export function assertNotFound(
  condition: unknown,
  message: string = "Not found",
): asserts condition {
  assert(condition, message, ErrorType.NotFoundError);
}

/**
 * Use in client because error thrown in server is only instance of Error
 */
export function isErr(err: Error, type: ErrorType) {
  return err.stack?.includes(type);
}
