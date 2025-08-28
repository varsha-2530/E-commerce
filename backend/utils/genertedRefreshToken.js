
// import jwt from 'jsonwebtoken'
// import User from '../model/user.js'

// const genertedRefreshToken = async(userId)=>{
//     const token = await jwt.sign({ id : userId},
//         process.env.SECRET_KEY_REFRESH_TOKEN,
//         { expiresIn : '7d'}
//     )

//     const updateRefreshTokenUser = await User.updateOne(
//         { _id : userId},
//         {
//             refresh_token : token
//         }
//     )

//     return token
// }

// export default genertedRefreshToken


import jwt from 'jsonwebtoken';
import User from '../model/user.js';

const generatedRefreshToken = async (userId) => {
  const token = jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_REFRESH_TOKEN,
    { expiresIn: '7d' }
  );

  await User.updateOne(
    { _id: userId },
    { refresh_token: token }
  );

  return token;
};

export default generatedRefreshToken;
