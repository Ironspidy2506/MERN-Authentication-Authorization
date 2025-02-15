import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    try {
        const {token} = req.cookies;

        if(!token) {
            return res.json({
                
            })
        }
        
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}