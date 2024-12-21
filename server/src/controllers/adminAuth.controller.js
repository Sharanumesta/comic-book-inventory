import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  const { email, password } = req.body;
  const clientToken = req.body.headers.Authorization?.split(" ")[1];
  if (clientToken) {
    const decode = jwt.verify(clientToken, process.env.TOKEN_SECRET);
    if(!decode) return res.status(400).json({massage : "Invalid Token"});
    console.log(decode);
    return res.status(200).json({message: "Token is valid"})
  }

  if (email === "" || password === "")
    return res.status(400).json({ massage: "Enter the credential" });

  const user = await Admin.findOne({ email });
  if (!user) return res.status(404).json({ massage: "User not found" });

  const passwordCorrect = await user.isPasswordCorrect(password);
  if (!passwordCorrect)
    return res.status(400).json({ massage: "Invalid credential" });

  const token = await user.generateToken();
  return res.status(200).json({ token });
};
export default login;
