import jwt from "jsonwebtoken";

const generatedAccessToken = async (userId) => {
    //console.log("Access Token Secret:", process.env.SECRET_KEY_ACCESS_TOKEN);

  const token = await jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_ACCESS_TOKEN,
    { expiresIn: "7d" }
  );
  return token
  
}
export default generatedAccessToken
