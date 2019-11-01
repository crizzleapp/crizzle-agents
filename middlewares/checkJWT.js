const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');


// TODO: Is Using the Management Identifier as `audience` secure?
const authConfig = {
    domain: "crizzle.auth0.com",
    audience: "https://crizzle.auth0.com/api/v2/"
};

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
        jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithms: ['RS256']
});

module.exports = checkJWT;
