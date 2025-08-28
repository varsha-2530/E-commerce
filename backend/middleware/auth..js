import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req?.header?.authorization?.split(" ")[1];
    // console.log(token);
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token NoT Get Successfully!",
      });
    }

    const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
    // console.log(decode);

    if (!decode) {
      res.status(401).json({
        success: false,
        message: "Authentication failed",
      });
    }

    req.userId = decode.id;
    console.log("Decoded User ID:", req.userId);

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export default auth;
