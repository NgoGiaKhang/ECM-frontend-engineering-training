import { http, HttpResponse } from "msw";

export type MockUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export const mockUsers: MockUser[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@gmail.com",
    password: "123456",
  },
  {
    id: "2",
    name: "John Doe",
    email: "jakhang@gmail.com",
    password: "password",
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane@gmail.com",
    password: "123123",
  },
];

export const userHandlers = [
  http.post("/api/login", async ({ request }) => {
    const body = (await request.json()) as {
      email: string;
      password: string;
    };

    const user = mockUsers.find(
      (u) => u.email === body.email && u.password === body.password,
    );

    if (!user) {
      return HttpResponse.json(
        {
          status: 401,
          message: "Invalid email or password",
          code: "AUTH_INVALID",
        },
        { status: 401 },
      );
    }

    return HttpResponse.json({
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token: "mock-token-" + user.id,
      },
    });
  }),
  http.get("/api/me", ({ request }) => {
    const auth = request.headers.get("authorization");

    if (!auth) {
      return HttpResponse.json(
        {
          status: 401,
          message: "Missing token",
          code: "NO_TOKEN",
        },
        { status: 401 },
      );
    }

    const token = auth.replace("Bearer ", "");
    const userId = token.replace("mock-token-", "");

    const user = mockUsers.find((u) => u.id === userId);

    if (!user) {
      return HttpResponse.json(
        {
          status: 404,
          message: "User not found",
          code: "USER_NOT_FOUND",
        },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }),
];
