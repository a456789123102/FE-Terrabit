import { NextRequest, NextResponse } from "next/server";
import {get} from "../../const"

export async function GET( req: NextRequest){
    try {
        const token = req.cookies.get("token")?.value;
        const res = await get(`/api/reviews/all?${req.nextUrl.searchParams.toString()}`, token);
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
 
}