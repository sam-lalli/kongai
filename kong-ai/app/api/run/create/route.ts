import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextResponse) {
    const {threadId, assistantId} = await req.json();


    if (!threadId || !assistantId) {
        return NextResponse.json({ error : "threadId and assistantId are required", success: false}, {status: 400});
    }

    const openai = new OpenAI();

    try {
        const run = await openai.beta.threads.runs.create(threadId,
            { assistant_id: assistantId }
        );

        console.log("Returned from openai", run)


        return NextResponse.json({ run, success: true}, {status: 201});
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error : "something went wrong", success: false}, {status: 500}); 
    }
}