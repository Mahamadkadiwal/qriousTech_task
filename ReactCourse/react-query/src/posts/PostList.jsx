export default function PostList({posts}){
  return (
    <>
    {posts && posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
     </> 
  )
}