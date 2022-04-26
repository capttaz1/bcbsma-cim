import { expressjwt, ExpressJwtRequest } from 'express-jwt';
import config from '@/config';

/**
 * Assuming that the JWT will come in a header with the form
 *
 * Authorization: Bearer ${JWT}
 *
 * But it could come in a query parameter with the name that you want like
 * GET https://www.bcbsma.com/stats?apiKey=${JWT}
 *
 */
function getTokenFromHeader(req) {
    /**
     * TODO: this may not be handled correctly by Edge
     */
    if (
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
        (req.headeers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    ) {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}

const isAuth = expressjwt({
    secret: config.jwtSecret, // the secret to sign the JWTs
    algorithms: [config.jwtAlgorithm], // JWT Algorithm
    userProperty: 'token', // Use req.token to store the JWT
    getToken: getTokenFromHeader, // How to extract the JWT from the request
});

export default isAuth;
