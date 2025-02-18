import { getUsers } from "@/actions/actions";

export default async function page() {
  const users = await getUsers();
  console.log({ users });

  return (
    <>
      <h1 className="text-xl font-semibold text-center mb-8">All users</h1>
    </>
  );
}
