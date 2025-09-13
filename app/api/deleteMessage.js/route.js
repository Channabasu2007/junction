import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, msgId } = req.body;
  if (!email || !msgId) {
    return res.status(400).json({ message: "Missing email or msgId" });
  }

  try {
    await dbConnect();
    const user = await User.findOneAndUpdate(
      { email },
      { $pull: { messages: { _id: msgId } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Delete message error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
