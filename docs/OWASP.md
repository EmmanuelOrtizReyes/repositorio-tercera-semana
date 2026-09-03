# Applicable OWASP risks

## A01: Broken Access Control

**Risk:** an authenticated user could attempt to create products or record sales without the required authorization.

**Implemented mitigation:** `AuthGuard('jwt')` protects `POST /products` and `POST /sales`; the sale owner is taken from the server-validated token.

**Recommended mitigation:** add roles and administrator permissions to separate catalog management from sales operations.

## A03: Injection

**Risk:** API input could be used to manipulate SQL queries.

**Implemented mitigation:** Prisma parameterizes queries, raw SQL concatenation is avoided, and DTOs validate types, ranges, and lengths.

**Recommended mitigation:** review and test every raw query if one becomes necessary in the future.

## A07: Identification and Authentication Failures

**Risk:** weak password or token handling could enable account impersonation.

**Implemented mitigation:** bcrypt with cost factor 12, configurable JWT expiration, public responses without `password_hash`, credential validation, and JWT guards.

**Recommended mitigation:** use `HttpOnly` and `Secure` cookies, token rotation and revocation, rate limiting, and production secret management. The current MVP keeps the JWT in `localStorage` for simplicity.
