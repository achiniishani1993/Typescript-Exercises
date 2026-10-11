import type { RequestHandler } from "express";
import { z } from "zod";

type ValidationSource = "body" | "params" | "query";

export function validate(
  schema: z.ZodType,
  source: ValidationSource
): RequestHandler {
  return (req, res, next) => {
    const parsed = schema.safeParse(req[source]);

    if (!parsed.success) {
      return res.status(400).json({
        errors: z.flattenError(parsed.error),
      });
    }

    res.locals.validated = parsed.data;

    next();
  };
}