import { queryOptions } from "@tanstack/react-query"
import { getUsers } from "../_lib/apiData"

export const usersQueryOptions = () =>
  queryOptions({
    queryKey: ["users"],
    queryFn: getUsers,
  });
