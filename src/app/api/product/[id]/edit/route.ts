import { NextRequest, NextResponse } from 'next/server';
import { patch } from "../../../const";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const body = await req.json();
        const token = req.cookies.get("token")?.value; // ดึง token จาก cookies

        if (!token) {
            return NextResponse.json({ error: "Token not found" }, { status: 401 });
        }

        const res = await patch(`/api/product/${id}/edit`, body, token); // ส่ง token ไปใน header
        const data = await res.json(); 
        return NextResponse.json(data,{status:res.status});
        
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({ error: "Update product failed" }, { status: 500 });
    }
}
