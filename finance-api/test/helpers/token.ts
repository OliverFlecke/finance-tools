// biome-ignore-all lint/style/noNonNullAssertion: fine in tests

import { exportJWK, generateKeyPair, SignJWT } from "jose";

export interface TestJwks {
	jwk: { n: string; e: string };
	privateKey: CryptoKey;
	publicKey: CryptoKey;
	token: string;
}

export async function createTestToken(): Promise<TestJwks> {
	const { publicKey, privateKey } = await generateKeyPair("RS256", { modulusLength: 2048 });

	const publicJwk = await exportJWK(publicKey);
	if (!publicJwk.n || !publicJwk.e) {
		throw new Error("Invalid public key");
	}

	const jwk = { n: publicJwk.n!, e: publicJwk.e! };

	const token = await new SignJWT({ sub: "test|user123", scope: "account:read" })
		.setProtectedHeader({ alg: "RS256", kid: "test-key" })
		.setIssuer("https://test.issuer/")
		.setAudience(["https://test.audience/"])
		.setIssuedAt()
		.setExpirationTime("1h")
		.sign(privateKey);

	return { jwk, privateKey, publicKey, token };
}
