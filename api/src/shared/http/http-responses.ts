import type { Response } from "express";

export const HttpResponse = {
  ok: (res: Response, data: unknown) => {
    res.status(200).json(data);
  },

  created: (res: Response, data: unknown) => {
    res.status(201).json(data);
  },

  noContent: (res: Response) => {
    res.status(204).end();
  },
};
