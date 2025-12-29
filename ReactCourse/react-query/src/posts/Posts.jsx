import { useEffect, useState } from "react";
import { usePosts } from "../api/getPosts";
import PostList from "./PostList";

export default function Posts() {
   let limit = 5;
   const [page, setPage] = useState(1);
   const [allPosts, setAllPosts] = useState([]);

  const { data, error, isPending } = usePosts(limit, page);

 useEffect(() => {
    if (data) {
      setAllPosts((prev) => [...prev, ...data]);
    }
  }, [page, data]);
  
     function handleClick(){
        setPage((p) => p + 1)   
    }
  return (
    <div>
      {isPending && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <PostList posts={allPosts} />

      <button onClick={handleClick}>Load more</button><p>{page}</p>
    </div>
  );
}
