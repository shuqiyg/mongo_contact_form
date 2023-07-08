import { NextResponse } from "next/server";
import connectMONGODB from "@/app/library/mongodb"
import Contact from "@/app/model/contact";
import mongoose from "mongoose";

export async function POST(req) {
    const { fullName, email, message } = await req.json();

    try {
        await connectMONGODB();
        await Contact.create({fullName, email, message});

        return NextResponse.json({
            msg: ["Message was created and sent successfully."], 
            success: true,
        })
    }catch(error){
        if(error instanceof mongoose.Error.ValidationError){
            let errorList = [];
            for(let e in error.errors){
                errorList.push(error.errors[e].message);
            }
            console.log(errorList)
            return NextResponse.json({msg: errorList})
        }else{
            return NextResponse.json(error)
        }
    }
}