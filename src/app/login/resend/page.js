"use client"
import React from "react"
import {useAuth} from '../../_components/AuthProvider'


export default function Page() {
    let USER = useAuth();
    const [email , setEmail] = React.useState("");
    const handleSubmit = async(e) => {
        e.preventDefault();
        let info = await fetch(`/api/users/resend` , {
                        method:"post",
                        body:JSON.stringify({email})
                    })
                    .then(res => res.json())
                    .catch(err => {message:"bad request"})

        alert(`${info.message}`)
    }
    return (
        <div className="flex items-center justify-center  h-nav">
        {!USER.user ? 
            <form className="bg-gradient-to-br from-white to-white dark:from-gray-900 dark:via-cyan-950 dark:to-slate-950 px-2 py-8 flex flex-col gap-3 items-center justify-center w-[98%] max-w-[650px] rounded-xl shadow-[0_0_10px_gray]" onSubmit={handleSubmit} autoComplete="on">
                <h1 className=" mx-auto text-xl font-bold text-center w-fit text-yellow-600 font-mono">Resend Verification Link</h1>
                <input type="email" name = 'email'  className="bg-blue-700/15 dark:bg-slate-950/50 w-[95%] font-semibold shadow-[0_0_3px_white] py-[10px] px-4 text-sm rounded-lg text-center outline-none focus:ring-blue-600 ring-1 text-red-950 dark:text-white" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="enter email" required/>
                <button type='submit' className='w-[95%] font-semibold shadow-[0_0_3px_white] bg-red-900/80 hover:bg-red-700 active:bg-violet-900 py-2 focus:bg-indigo-950 px-4 rounded-lg mx-auto text-center text-white' >Resend</button>
            </form>
            :
            <h1 className="max-w-[95%] mx-auto py-4 px-8 rounded-lg text-xl font-bold bg-cyan-950 text-center w-fit shadow-[0_0_5px_white] text-yellow-600">You are already logged-in with email: <span className="drop-shadow-[0_0_4px_red] text-white">{USER.user.email}</span></h1>
        }
        </div>
    )
}