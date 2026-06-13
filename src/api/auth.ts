import { Auth0Client } from "@auth0/auth0-spa-js";

export const authClient = new Auth0Client({
	domain: process.env.NEXT_PUBLIC_DOMAIN ?? "",
	clientId: process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
	cacheLocation: "localstorage",
	useRefreshTokens: true,
	useRefreshTokensFallback: true,
	authorizationParams: {
		redirect_uri: typeof window !== "undefined" ? process.env.NEXT_PUBLIC_REDIRECT_URI : undefined,
		audience: process.env.NEXT_PUBLIC_AUDIENCE,
		scope: "account:read profile",
	},
});
