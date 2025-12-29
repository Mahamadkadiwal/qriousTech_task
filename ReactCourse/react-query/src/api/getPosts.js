import { useQuery } from "@tanstack/react-query";

export function usePosts(limit, page){
    return useQuery({
        queryKey: ["posts", page],
        queryFn : async () => {
            const start = (page -1) * limit;
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_start=${start}`);
            return res.json();
        }
    });
}