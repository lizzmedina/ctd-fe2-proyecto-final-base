import { rest } from "msw";
import { quote, allQuotes } from './dataMock';
import { API_URL } from "../app/constants";

export const handlers = [
  // Primera peticion para obtener todos
  rest.get(`${API_URL}`, (req, res, ctx) => {
    const nameParam = req.url.searchParams.get('character')

    if (nameParam) {
      return res(
        ctx.status(200),
        ctx.json({
          data: quote
        })
      )
    }

    return res(
      ctx.status(200),
      ctx.json({
        data: allQuotes
      })
    )
  })
]