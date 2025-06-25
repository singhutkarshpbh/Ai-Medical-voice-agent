import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {notes} = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemma-3-4b-it:free",
      messages: [
        {role:'system' , content:JSON.stringify(AIDoctorAgents)},
        { role: "user", content: "User Notes/Symptom:"+notes+" , Depends on user notes and symptoms, Please suggest a list of doctors , Return object in JSON only" }],
    });

    const rawResp = completion.choices[0].message;
    //@ts-ignore
    const Resp =  rawResp.content.trim().replace('```json','').replace('```','');

    const JSONResp = JSON.parse(Resp);
    return NextResponse.json(JSONResp);
  } catch (e) {
    return NextResponse.json(e);
  }
}
