# pit-garden-gatekeeper

Field test for Ocelot API gateway

## Gatekeeper

A .Net-based gateway server
- Configuring Ocelot
- With Azure AD Authentication system
- Forward requests to upstream app servers.

## Bonbon server

A deno-based app server
- Implements an extremly simple data model
  ``` typescript
  interface IBonbon {
    id: string
    dbname: string
    popular: boolean
    count: number
  }
  ```
- Has an imaginary database
- Opens up a REST api endpoint (query only)
- No authentication required.
- Should not be allowed to access from anywhere except the API gateway.

## Flow

User from the Insomnia API client trying to request Bonbon server.

On first attempt, the user is greeted with 401 error by the API Gateway, since he is not logged in.

The user logs in with OAuth from Microsoft login page.

On successful log-in, the user sends a second request containing auth token.

API Gateway allows, so the user can now access data from Bonbon server.

## Future works

An upstream GraphQL server

An upstream GRPC server
