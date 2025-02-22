import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET() {
    const user = await currentUser();

    if(!user){
        return NextResponse.json({ message : "unauthorized", success: false}, {status: 401}); 
    }
    
    // Get user thread from DB
    const userThread = await prismadb.userThread.findUnique({where: {userId: user.id}});

    // If it does exist
    if(userThread){
        return NextResponse.json({ userThread, success: true}, {status: 200}); 
    }

    // If it does not exist create and save to db
    try {
        const openai = new OpenAI();
        const thread = await openai.beta.threads.create();
    
        const newUserThread = await prismadb.userThread.create({
            data: {
                userId: user.id,
                threadId: thread.id
            }
        });
    
        return NextResponse.json({ newUserThread, success: true}, {status: 200});

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message : "error creating thread", success: false}, {status: 500}); 
    }
}