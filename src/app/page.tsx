import { getUserFromCookies } from "./lib/auth";

export default async function HomePage() {
  const user = getUserFromCookies();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Home Page</h1>
      {user ? (
        <div className="mt-4">
          <p>Welcome, <b>{user.email}</b> 🎉</p>
          <form action="/login" method="POST">
            <button className="bg-red-500 text-white p-2 rounded mt-2">Logout</button>
          </form>
        </div>
      ) : (
        <p className="mt-4">You are not logged in. <a href="/login" className="text-blue-500">Login</a></p>
      )}
    </div>
  );
}
