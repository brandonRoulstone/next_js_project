import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Link from "next/link";

const Dashboard = async () => {
    const session = getServerSession();
    if(!session){
        redirect('/login')
    }
  return (
    !session ? (
      <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-gray-100">
       <h1 className="text-red-400 border p-4">
          User successfully logged in, Here you can put anything you want
        </h1>
        <Link href="/dashboard" className="py-2 px-5 bg-blue-300 hover:bg-blue-500">Login</Link>
      </div>
    ) : (
      <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-gray-800">
        <h1 className="text-green-400 border p-4">
          User successfully logged in, Here you can put anything you want
        </h1>
      </div>
    )
  )
}

export default Dashboard
