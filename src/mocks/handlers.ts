import { rest } from "msw";
import { quote, quoteBart } from './dataMock';
import { API_URL } from "../app/constants";

export const handlers = [

  rest.get(API_URL, (req, res, ctx) => {
    const nameParam = req.url.searchParams.get('character');
  
    if (nameParam) {
      return res(
        ctx.status(200),
        ctx.json(quote)
      )
    }

    return res(
      ctx.status(200),
      ctx.json( quoteBart)
    )
  })
]