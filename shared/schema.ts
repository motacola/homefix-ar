import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

// Appliance models table
export const appliances = pgTable("appliances", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  type: text("type").notNull(), // e.g., "washing_machine", "refrigerator"
  yearStart: integer("year_start"), // Starting year of model range
  yearEnd: integer("year_end"), // Ending year of model range
  imageUrl: text("image_url"),
});

export const insertApplianceSchema = createInsertSchema(appliances).pick({
  name: true,
  brand: true,
  model: true,
  type: true,
  yearStart: true,
  yearEnd: true,
  imageUrl: true,
});

// Repair issues table
export const repairIssues = pgTable("repair_issues", {
  id: serial("id").primaryKey(),
  applianceId: integer("appliance_id").notNull(),
  title: text("title").notNull(), // e.g., "Not spinning", "Not cooling"
  description: text("description"),
  difficulty: text("difficulty").notNull(), // "beginner", "medium", "advanced"
  estimatedTime: text("estimated_time"), // e.g., "30-45 min"
  isPopular: boolean("is_popular").default(false),
});

export const insertRepairIssueSchema = createInsertSchema(repairIssues).pick({
  applianceId: true,
  title: true,
  description: true,
  difficulty: true,
  estimatedTime: true,
  isPopular: true,
});

// Repair guide steps table
export const repairSteps = pgTable("repair_steps", {
  id: serial("id").primaryKey(),
  repairIssueId: integer("repair_issue_id").notNull(),
  stepNumber: integer("step_number").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  arMarkers: jsonb("ar_markers"), // Array of AR marker positions and labels
  isSafetyWarning: boolean("is_safety_warning").default(false),
});

export const insertRepairStepSchema = createInsertSchema(repairSteps).pick({
  repairIssueId: true,
  stepNumber: true,
  title: true,
  description: true,
  imageUrl: true,
  arMarkers: true,
  isSafetyWarning: true,
});

// User repair history
export const repairHistory = pgTable("repair_history", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  repairIssueId: integer("repair_issue_id").notNull(),
  lastStepCompleted: integer("last_step_completed").default(0),
  completedAt: timestamp("completed_at"),
  startedAt: timestamp("started_at").defaultNow().notNull(),
});

export const insertRepairHistorySchema = createInsertSchema(repairHistory).pick({
  userId: true,
  repairIssueId: true,
  lastStepCompleted: true,
  completedAt: true,
  startedAt: true,
});

// Recommended parts for repairs
export const repairParts = pgTable("repair_parts", {
  id: serial("id").primaryKey(),
  repairIssueId: integer("repair_issue_id").notNull(),
  name: text("name").notNull(),
  partNumber: text("part_number"),
  description: text("description"),
  price: text("price"),
  supplier: text("supplier"), // e.g., "iFixit", "Amazon"
  supplierUrl: text("supplier_url"),
  imageUrl: text("image_url"),
});

export const insertRepairPartSchema = createInsertSchema(repairParts).pick({
  repairIssueId: true,
  name: true,
  partNumber: true,
  description: true,
  price: true,
  supplier: true,
  supplierUrl: true,
  imageUrl: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Appliance = typeof appliances.$inferSelect;
export type InsertAppliance = z.infer<typeof insertApplianceSchema>;

export type RepairIssue = typeof repairIssues.$inferSelect;
export type InsertRepairIssue = z.infer<typeof insertRepairIssueSchema>;

export type RepairStep = typeof repairSteps.$inferSelect;
export type InsertRepairStep = z.infer<typeof insertRepairStepSchema>;

export type RepairHistory = typeof repairHistory.$inferSelect;
export type InsertRepairHistory = z.infer<typeof insertRepairHistorySchema>;

export type RepairPart = typeof repairParts.$inferSelect;
export type InsertRepairPart = z.infer<typeof insertRepairPartSchema>;

// AR Marker type for type safety
export const ARMarkerSchema = z.object({
  id: z.string(),
  label: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number(),
    z: z.number().optional(),
  }),
  size: z.number().optional().default(1),
});

export type ARMarker = z.infer<typeof ARMarkerSchema>;
