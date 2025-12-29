// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchData } from "./Features/UserSlice";
// import Cart from "./Features/components/Cart";

// function App() {
//   const dispatch = useDispatch();

//   const { users, isLoading, error } = useSelector((state) => state.user);

//   useEffect(() => {
//     dispatch(fetchData());
//   }, [dispatch]);

//   return (
//     <>
//       <ul>
//         {users.map((u) => (
//           <li key={u.id}>{u.name}</li>
//         ))}
//       </ul>
//       <Cart />
//     </>
//   );
// }

// export default App;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();

  // Access user state from Redux store
  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    // Dispatch saga action to fetch users
    dispatch({ type: "FETCH_REQUEST" });
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
