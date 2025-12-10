import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { sveltekitCookies } from 'better-auth/svelte-kit'

import { getRequestEvent } from '$app/server'

import { db } from "./db";

export const auth = betterAuth({
  secret: 'pT6RaptK51yklWGeVimPbVm8RlmO87Uz',
  database: drizzleAdapter(db, {
    provider: "sqlite"
  }),
  plugins: [sveltekitCookies(getRequestEvent)],
  emailAndPassword: {
    enabled: true
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false,
      },
    },
  },
});