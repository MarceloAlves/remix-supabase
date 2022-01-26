import { LoaderFunction, Outlet, redirect } from "remix";
import { supabaseStrategy } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await supabaseStrategy.checkSession(request);
  if (!session) {
    return redirect("/");
  }

  return null;
};

export default function App() {
  return (
    <div>
      <h1>I'm a template damnit!</h1>
      <Outlet />
    </div>
  );
}
