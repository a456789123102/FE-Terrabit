import { type NextRequest, NextResponse } from 'next/server';
import {get } from "../../const"; 

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value;
        const res = await get('/api/address/myAddress', token);
        const data = await res.json();
        return NextResponse.json(data);
    }catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "get address failed" }, { status: 500 });
    }
}