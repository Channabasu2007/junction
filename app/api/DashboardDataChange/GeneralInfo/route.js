import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await dbConnect();

  const { firstname, lastname, email, businessEmail, phone, bio } = await req.json();

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { firstname, lastname, businessEmail, phone, bio },
      { new: true } // ✅ Return the updated document
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User updated successfully", user}, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error updating user" }, { status: 500 });
  }
}
