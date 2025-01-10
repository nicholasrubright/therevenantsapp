import { it, expect, describe, vi } from "vitest";
import { prisma as prismaMock } from "./globalForPrisma";
// vi.mock('@/libs/__mocks__/prisma')

vi.mock("./globalForPrisma", async () => {
  const actual =
    await vi.importActual<typeof import("./globalForPrisma")>(
      "./globalForPrisma",
    );
  return {
    ...actual,
  };
});

// Tests.....
