import { auth } from "@/lib/auth";
import { logoutUser } from "@/actions/auth.actions";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-600">
            Welcome, {session?.user?.name} ({session?.user?.email})
          </p>
        </div>

        <form action={logoutUser}>
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded text-sm"
          >
            Logout
          </button>
        </form>
      </div>

      <p className="text-gray-500">Yahan aapke saare blog posts aayenge.</p>
    </div>
  );
}