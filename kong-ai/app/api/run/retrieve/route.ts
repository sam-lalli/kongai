import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
    const {threadId, runId} = await req.json();


    if (!threadId || !runId) {
        return NextResponse.json({ error : "threadId and runId are required", success: false}, {status: 400});
    }

    const openai = new OpenAI();

    try {
        const run = await openai.beta.threads.runs.retrieve(threadId, runId);

        console.log("Returned from openai", run)


        return NextResponse.json({ run, success: true}, {status: 200});
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error : "something went wrong", success: false}, {status: 500}); 
    }
}