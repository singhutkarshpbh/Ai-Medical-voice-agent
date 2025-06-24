import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const user = await currentUser();


    try {
        const users= await db.select().from(SessionChatTable)

        //@ts-ignore
        .where(eq(SessionChatTable.email , user?.primaryEmailAddress?.emailAddress));

        if(users?.length == 0){

            const result = await db.insert(SessionChatTable).values({
                //@ts-ignore
                name:user?.fullName,
                email:user?.primaryEmailAddress?.emailAddress,
                credits:10
                //@ts-ignore
            }).returning({ SessionChatTable })
        return NextResponse.json(result[0]?.SessionChatTable);
        }

        return NextResponse.json(users[0]);
    } catch (e) {
        return NextResponse.json(e);
    }
}

export async function GET(req:NextRequest) {
    const {searchParams} = new URL(req.url);

    const sessionId= searchParams.get('sessionId');

    const user = await currentUser()

    const result = await db.select().from(SessionChatTable)
    //@ts-ignore
    .where(eq(SessionChatTable.sessionId , sessionId));

    return NextResponse.json(result[0]);
}