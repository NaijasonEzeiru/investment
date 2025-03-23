import { getUser } from "@/actions/actions";
import EditUser from "@/components/edit-user";

type tParams = Promise<{ id: string }>;

export default async function Page({ params }: { params: tParams }) {
  const { id } = await params;
  const user = await getUser(id);

  if (user.user) {
    return <EditUser user={user.user} />;
  }

  return (
    <>
      <h1 className="text-xl font-semibold text-center mb-8">Ooops</h1>
      <p>User not found</p>
    </>
  );
}
