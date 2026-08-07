import { UserManager, WebStorageStateStore } from "oidc-client-ts";

export const userManager = new UserManager({
	authority: `https://${process.env.NEXT_PUBLIC_DOMAIN ?? ""}`,
	client_id: process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
	redirect_uri:
		process.env.NEXT_PUBLIC_REDIRECT_URI ??
		(typeof window !== "undefined" ? window.location.origin : ""),
	scope: "openid profile offline_access account:read",
	automaticSilentRenew: true,
	userStore:
		typeof window !== "undefined"
			? new WebStorageStateStore({ store: window.localStorage })
			: undefined,
	extraQueryParams: {
		audience: process.env.NEXT_PUBLIC_AUDIENCE ?? "",
	},
});
