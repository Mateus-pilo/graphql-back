import * as jwt from 'jsonwebtoken';
import {profiles as getProfiles} from '../resolvers/type/User';

const generateToken = async (user) => {

    const profiles = await getProfiles(user);
    const now = Math.floor(Date.now() / 1000);

    //expiration in three days
    const exp = now + (3 * 24 * 60 * 60);

    const userPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
        profiles: profiles.map(res => res.name),
        iat: now,
        exp,
    }
    const token = jwt.sign(userPayload, process.env.SECRET_JWT, { algorithm: 'HS256' });
    return {
        ... userPayload,
        token
    }
};


const decodeToken = async ( iToken )  => {
    try {
        const verify = await jwt.verify(iToken, process.env.AUTH.SECRET_JWT);
        return verify;
    } catch (error) {
        throw new Error(error);
    }
}

export {
    generateToken,
    decodeToken
}