"use client"

import { useState } from "react"
    
export default function ContactForm() {
    const [fullName, setFullName] = useState();
    const [email, setEmail ] = useState();
    const [message, setMessage] = useState();
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        const response = await fetch('api/contact', {
            method: "POST",
            headers: {
                "Content-type" : "application/json",
            },
            body: JSON.stringify({
                fullName,
                email,
                message,
            }),
        });

        const { msg, success } = await response.json();
        setSuccess(success);
        if(success){
            setEmail("");
            setFullName("");
            setMessage("");
        }
        setError(msg);
    }

    return(
        <>
            <form onSubmit={handleSubmit} className="py-4 mt-4 border-t flex flex-col gap-5">
                <div>
                    <label htmlFor="fullname">Full Name</label>
                    <input 
                        value={fullName}
                        type="text" 
                        id="fullname" 
                        placeholder="sq" 
                        onChange={(e:any)=> setFullName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        value={email}
                        type="text" 
                        id="email" 
                        placeholder="sq@email.com" 
                        onChange={(e:any)=> setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="message">Message</label>
                    <textarea  
                        value={message}
                        className="h-32" 
                        id="message" 
                        placeholder="Message starts here..." 
                        onChange={(e:any)=> setMessage(e.target.value)}
                    />
                </div>

                <button className="bg-green-500 p-3 text-white font-bold" type="submit">Send</button>             
            </form>

            <div className="bg-slate-200 flex flex-col">
                {
                    error && error.map(e => (
                        <div className={`${success ? "text-green-300" : "text-red-500"} px-5`}>{e}</div>
                    ))
                }
            </div>
        </>
    )
}