import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers("Authorization");
        if(!token){
            return res.status(403).send({message:"Access denied"});
        }

        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length);
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();               

    } catch (error) {
        console.log(error);
    }
}

