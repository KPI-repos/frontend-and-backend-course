import "reflect-metadata";
import "@/di/container";
import request from "supertest";
import { PrismaClient } from "@prisma/client";
import app from "@/app";

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.plant.deleteMany();
  await prisma.category.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Category Routes Integration Tests", () => {
  describe("GET /categories", () => {
    it("should return an empty array when no categories exist", async () => {
      const response = await request(app).get("/category");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe("POST /category", () => {
    it("should create a new category", async () => {
      const newCategory = { name: "New Category" };

      const response = await request(app).post("/category").send(newCategory);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.name).toBe(newCategory.name);
    });
  });

  describe("GET /category (after creating category)", () => {
    it("should return an array of category", async () => {
      const response = await request(app).get("/category");

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("name");
    });
  });
});
