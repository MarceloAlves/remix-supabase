import { ActionFunction, LoaderFunction, redirect } from "remix";
import { authenticator, supabaseStrategy } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await supabaseStrategy.checkSession(request);
  if (!session) {
    return redirect("/");
  }

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: "/" });
};

export default function PrivatePage() {
  return <div>PRIVATE -- KEEP OUT</div>;
}
