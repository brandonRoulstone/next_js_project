"use client"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

const Register = () => {
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();

    useEffect(() => {
        if(sessionStatus === 'authenticated'){
            router.push("/dashboard")
        }
    }, [sessionStatus, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const confirmPassword = e.target[3].value;
        console.log(password)
        console.log(confirmPassword)

        if(!username || !email || !password || !confirmPassword){
            toast.error('Please fill in all the input fields')
            return;
        } else if(password !== confirmPassword){
            toast.error('Passwords does not match')
            return;
        }

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    confirmPassword
                })
            });
            if(res.status === 400){
                // console.log("ends here by 400");
                toast.error("This is already user is already registered")
            } else if (res.status === 201){
                toast("Hello you have signed up you will be sent to the login")
                router.push('/login')
            }

        } catch (error) {
            toast.error(error)
        }
    };

    if (sessionStatus === "loading"){
        return <h1 className="animate-pulse">Loading ...</h1>;
    }



  return sessionStatus !== "authenticated" && (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

        <div className="bg-white p-8 rounded shadow-md w-96">

            <h2 className="text-2xl font-semibold mb-4">
                Register
            </h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="Email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input 
                        type="email" 
                        id="Email" 
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="Password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input 
                        type="password" 
                        id="Password" 
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm password</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <button type="submit" className="mb-5 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Register</button>
                </div>
                <span>
                    {" "}
                    Already have an account? { " " }
                    <Link className="text-center text-blue-500 hover:underline my-2" href="/login">Login</Link>
                </span>

            </form>
        </div>
    </div>
  )
}

export default Register
