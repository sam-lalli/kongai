import { NextResponse } from "next/server";
import OpenAI from "openai";


export async function POST(req: Request) {
    const {threadId} = await req.json();

        if (!threadId) {
            return NextResponse.json({ error : "threadId is required", success: false}, {status: 400});
        }

        const openai = new OpenAI();
    
        try {
            const messages = await openai.beta.threads.messages.list(threadId);
            
            console.log("Returned from openai", messages)

    
            return NextResponse.json({ messages, success: true }, {status: 200});
        } catch (error) {
            console.log(error)
            return NextResponse.json({ error : "something went wrong", success: false}, {status: 500}); 
        }
}