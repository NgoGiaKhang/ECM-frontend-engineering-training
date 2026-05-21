import { delay, http, HttpResponse } from "msw";
import { products } from "./data/products";
import { userHandlers } from "./data/user";

export const handlers = [
  // GET PRODUCTS
  http.get("/api/products", async ({ request }) => {
    await delay(800);

    const url = new URL(request.url);

    // PAGINATION
    const page = Number(url.searchParams.get("page") ?? 1);

    const limit = Number(url.searchParams.get("limit") ?? 8);

    // SORT
    const sort = url.searchParams.get("sort");

    let result = [...products];

    switch (sort) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;

      case "sold":
        result.sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0));
        break;
    }

    // PAGINATION
    const start = (page - 1) * limit;

    const end = start + limit;

    const items = result.slice(start, end);

    return HttpResponse.json({
      data: items,

      pagination: {
        page,
        limit,
        total: result.length,
        totalPages: Math.ceil(result.length / limit),
      },
    });
  }),

  // GET PRODUCT DETAIL
  http.get("/api/products/:id", async ({ params }) => {
    await delay(500);

    const product = products.find((item) => item.id === params.id);

    if (!product) {
      return HttpResponse.json(
        {
          message: "Product not found",
        },
        {
          status: 404,
        },
      );
    }

    return HttpResponse.json({
      data: product,
    });
  }),
  ...userHandlers,
];
