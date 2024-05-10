import User from "@/model/User";
import connectDB from "@/config/db";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

export const POST = async (request) => {
    const { username, email, password, confirmPassword } = await request.json();

    if(password !== confirmPassword){
        return new NextResponse.json(JSON.stringify({error: "passwords do not match"}, {status: 400}));
    }

    await connectDB();

    const existingUser = await User.findOne({email});

    if(existingUser){
        return NextResponse.json(JSON.stringify({error: "user already exists"}, {status: 400}));
    }

    
    const hashedPwd = await bcrypt.hash(password, 10)
    const newUser = new User({username, email, password: hashedPwd})
    try {
        await newUser.save()
        return new NextResponse("user is successfully created", {status: 201})

    } catch (error) {

        return new NextResponse(JSON.stringify({ error: "An error occurred" }), { status: 500 });
        
    }
}