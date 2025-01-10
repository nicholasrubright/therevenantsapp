import { test } from "vitest";

import type { inferProcedureInput } from "@trpc/server";
import { createCaller, type AppRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { createContext } from "@/trpc/server";

test("get character", async () => {
  const ctx = await createContext();

  const caller = createCaller(ctx);

  const input: inferProcedureInput<AppRouter["character"]["get"]> = [
    {
      name: "test",
      realm: "test_realm",
      region: "US",
    },
    {
      name: "test2",
      realm: "test_realm",
      region: "US",
    },
  ];
});
