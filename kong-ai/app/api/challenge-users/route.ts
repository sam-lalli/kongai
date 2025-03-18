import { prismadb } from "@/lib/prismadb";
import { UserThread } from "@prisma/client";
import axios from "axios";
import { NextResponse } from "next/server";
import OpenAI from "openai";

interface UserThreadMap {
  [userId: string]: UserThread;
}

export async function POST(request: Request) {
  // Validation
  const body = await request.json();

  const { challengeId, secret } = body;

  if (!challengeId || !secret) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      {
        status: 400,
      }
    );
  }

  if (secret !== process.env.APP_SECRET_KEY) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      {
        status: 401,
      }
    );
  }

  // Define work out message prompt
  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `
        Generate an ultra-intense workout designed in the style of King Kong. The assistant should respond with exaggerated intensity, pushing the user to become the king of the jungle. It should acknowledge the user’s efforts while motivating them to dominate their training. The output must only include these two components, nothing else.
        
        Here's an example output that you should follow:
        
        Good morning, King! 👑 Today's workout is PUSH DAY. Ready to dominate the jungle? Reply YES to start.

        After the User responds "Yes", reply with a workout in the following format:

        Great! Here's your workout:
        1. Bench Press: 4 sets x 8-10 reps
        2. Incline DB Press: 3 sets x 10-12 reps
        3. Shoulder Press: 4 sets x 8-10 reps
        4. Lateral Raises: 3 sets x 12-15 reps
        5. Tricep Pushdowns: 3 sets x 12-15 reps
        
        Text DONE when complete!

        After the user responds with "DONE", reply with the following format:

        Amazing work! Based on your performance, I'm adjusting your next workout to increase shoulder press weight by 5lbs. Rest well, tomorrow is LEG DAY! 💪
        `,
    },
    {
      role: "user",
      content: `Generate a new King Kong workout. Remember, only respond in the format specifed earlier. Nothing else`,
    },
  ];

  //  Use OpenAI to generate work out
  const {
    data: { message, success },
  } = await axios.post<{ message?: string; success: boolean }>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/openai`,
    {
      messages,
      secret: process.env.APP_SECRET_KEY,
    }
  );

  if (!message || !success) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong with generate openai response",
      },
      {
        status: 500,
      }
    );
  }

  console.log(message);

  // Grab all challenge preferences
  const challengePreferences = await prismadb.challengePreferences.findMany({
    where: {
      challengeId,
    },
  });

  console.log("challengePreferences", challengePreferences);

  const userIds = challengePreferences.map((cp) => cp.userId);

  console.log("userIds", userIds);

  //  Grab all user threads
  const userThreads = await prismadb.userThread.findMany({
    where: {
      userId: {
        in: userIds,
      },
    },
  });

  console.log("userThreads", userThreads);

  const userThreadMap: UserThreadMap = userThreads.reduce((map, thread) => {
    map[thread.userId] = thread;
    return map;
  }, {} as UserThreadMap);

  
}