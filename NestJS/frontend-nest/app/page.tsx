import { redirect } from "next/navigation";


export default function Home() {
  redirect('/auth/signin');
  return (
    <div><h1>hello</h1></div>
  );
}
