const jwt = require("jsonwebtoken");

const token = jwt.sign(
    {id: }, 
    process.env.JWt_SECRET,
    {expiresIn: "1h"}
);

res.cookie("token", token, {
    httpOnly:true,
    secure:false, 
    sameSite: "strict",
});

res.json({message: "Logged in"})