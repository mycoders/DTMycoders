// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { serverClient } from "../../../sanity/sanity-utils";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const data = req.body; // Parse the body to get the data

    console.log(data.walletAddress, "data - dtrust signup");

    const user = await serverClient.fetch(
      `*[_type == "users" && walletAddress == "${data.walletAddress}"]`
    );
    console.log(user, "user - dtrust signup");
    const document = {
      _id: user[0]._id,
      _type: "users",
      walletAddress: data.walletAddress,
      name: data.name,
      email: data.email,
      isApproved: false,
    };
    const updated_user = await serverClient.createOrReplace(document);
    console.log(updated_user, "updated user");
    res.status(200).json({ success: true, data: data });

    // Do something with the data, like saving it to a database
  } else {
    res.status(405).json({ error: "Method not allowed" }); // Only allowing POST requests
  }
}
