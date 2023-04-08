import { RouteDataArgs, createRouteData, useRouteData } from "solid-start";
import server$ from "solid-start/server";

type Todo = {
  userId?: number;
  id?: number;
  title?: string;
  completed?: boolean;
};

export function routeData({ params }: RouteDataArgs) {
  return createRouteData(
    async () => {
      const response = await server$.fetch(
        "https://jsonplaceholder.typicode.com/todos/3"
      );
      const data = (await response.json()) as Todo;
      return data;
    },
    {
      key: () => ["test"],
    }
  );
}

export default function TestPage() {
  const todo = useRouteData<typeof routeData>();

  return (
    <div>
      <h1>Test page</h1>
      <div>
        <p>{todo()?.title}</p>
      </div>
    </div>
  );
}
