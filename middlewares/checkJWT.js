const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// Authentication Middleware.
// When used, Access Token must exist and be verified against Auth0 JWKS.
const checkJWT = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: `${process.env.AUTH0_CLIENTID}`,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
});

module.exports = checkJWT;
