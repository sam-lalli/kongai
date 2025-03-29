import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const response = await request.json();

  const { id, sendNotifications, challengeId, daysOfWeek } = response;

  if (!id || sendNotifications === undefined || !challengeId || !daysOfWeek) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const updatedChallengePreferences =
      await prismadb.challengePreferences.update({
        where: {
          id: id,
          userId: user.id,
        },
        data: {
          challengeId,
          sendNotifications,
          daysOfWeek,
        },
      });

    return NextResponse.json({
      success: true,
      data: updatedChallengePreferences,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}