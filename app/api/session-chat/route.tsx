import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { currentUser } from "@/lib/current-user";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
    const { notes, selectedDoctor } = await req.json();
    const user = await currentUser(req)
    console.log('user', user)

    try {
        const sessionId = uuidv4()
        const result = await db.insert(SessionChatTable).values({
            sessionId: sessionId,
            createdBy: user.email,
            notes: notes,
            selectedDoctor: selectedDoctor,
            createdOn: (new Date()).toString()
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
        }).returning({ SessionChatTable });

        return NextResponse.json(result[0]?.SessionChatTable)
    } catch (error) {
        return NextResponse.json(error)

    }
}


export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const sessionId = searchParams.get("sessionId");
        const user = await currentUser(req);
        console.log('user', user)

        if (sessionId == 'all') {
              const result = await db
                .select()
                .from(SessionChatTable)
                .where(eq(SessionChatTable.createdBy, user.email))
                .orderBy(desc(SessionChatTable.id));

            if (!result || result.length === 0) {
                return NextResponse.json(
                    { error: "Session not found" },
                    { status: 404 }
                );
            }

            return NextResponse.json(result);

        } else {
            const result = await db
                .select()
                .from(SessionChatTable)
                .where(eq(SessionChatTable.sessionId, sessionId));

            if (!result || result.length === 0) {
                return NextResponse.json(
                    { error: "Session not found" },
                    { status: 404 }
                );
            }

            return NextResponse.json(result[0]);
        }



    } catch (error) {
        console.error("GET /api/session-chat error:", error);

        return NextResponse.json(
            {
                error: "Something went wrong",
                details: error instanceof Error ? error.message : error
            },
            { status: 500 }
        );
    }
}
