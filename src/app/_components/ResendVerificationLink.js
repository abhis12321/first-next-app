import axios from "axios";
import { useState } from "react";
import { useAuth } from "./AuthProvider";


export default function ResendVerificationLink({ setOption }) {
    let USER = useAuth();
    const [email, setEmail] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setOption(4);
        axios.post(`/api/users/resend`, { email })
            .then(res => res.data)
            .then(data => data.message)
            .then(message => alert(message))
            .catch(error => alert(error.message))
            .then(() => setOption(0));
    }
    return (
        <div className="fixed top-0 left-0 z-20 h-[100vh] w-full flex items-center justify-center bg-gray-700/90">
            {!USER.user ?
                <form className="from-blue-50 to-blue-50 bg-gradient-to-b  dark:from-blue-900 dark:via-cyan-950/90 dark:to-blue-950 shadow-[0_0_10px_black] dark:shadow-[0_0_4px_white] px-2 py-8 flex flex-col gap-3 items-center justify-center w-[98%] max-w-[650px] rounded-xl" onSubmit={handleSubmit} autoComplete="on">
                    <h1 className=" mx-auto text-xl font-bold text-center w-fit text-yellow-600 font-mono">Resend Verification Link</h1>

                    <input type="email" name='email' className="bg-blue-700/15 dark:bg-slate-950/50 w-[95%] font-semibold shadow-[0_0_3px_white] py-[10px] px-4 text-sm rounded-lg text-center outline-none focus:ring-blue-600 focus:bg-violet-800/15 ring-1 text-red-950 dark:text-white" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="enter email" required />

                    <div className="flex w-[95%] items-center justify-between gap[2px] border-[2px] border-cyan-500 dark:border-cyan-600 rounded-lg overflow-hidden">
                        <div className="w-[50%] text-white/80 bg-orange-900 hover:bg-orange-700 active:bg-violet-900 p-2 text-center outline-none font-semibold cursor-pointer border-r-[2px] border-cyan-500 dark:border-cyan-600" onClick={e => setOption(0)}>cancel</div>
                        <input type="submit" value={'send'} className='w-[50%] text-white/80 bg-red-800 hover:bg-red-600 active:bg-violet-900 p-2 text-center outline-none font-semibold cursor-pointer' required />
                    </div>
                </form>
                :
                <h1 className="max-w-[95%] mx-auto py-4 px-8 rounded-lg text-xl font-bold bg-cyan-950 text-center w-fit shadow-[0_0_5px_white] text-yellow-600">You are already logged-in with email: <span className="drop-shadow-[0_0_4px_red] text-white">{USER.user.email}</span></h1>
            }
        </div>
    )
}