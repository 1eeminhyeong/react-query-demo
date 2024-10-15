import { createQueryKeys } from "@lukemorales/query-key-factory";
import axios from "axios";

const BASE_URL = "https://my-json-server.typicode.com/1eeminhyeong/demo/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

type TodoFilter = {
  offset: number;
  limit: number;
};

const todoKeys = createQueryKeys("todo", {
  all: null,
  list: (filter: TodoFilter) => ({
    queryKey: [{ filter }],
    queryFn: async () => {
      const [] = await Promise.all([axiosInstance.get("list")]);
    },
  }),
});
