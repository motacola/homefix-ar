import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // =============================================
  // Appliance Routes
  // =============================================
  
  // Get all appliances
  app.get("/api/appliances", async (req: Request, res: Response) => {
    const appliances = await storage.getAllAppliances();
    res.json(appliances);
  });
  
  // Get appliances by type
  app.get("/api/appliances/type/:type", async (req: Request, res: Response) => {
    const { type } = req.params;
    const appliances = await storage.getAppliancesByType(type);
    res.json(appliances);
  });
  
  // Get single appliance
  app.get("/api/appliances/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    
    const appliance = await storage.getAppliance(id);
    if (!appliance) {
      return res.status(404).json({ message: "Appliance not found" });
    }
    
    res.json(appliance);
  });
  
  // Search appliances
  app.get("/api/appliances/search/:query", async (req: Request, res: Response) => {
    const { query } = req.params;
    const appliances = await storage.searchAppliances(query);
    res.json(appliances);
  });
  
  // =============================================
  // Repair Issue Routes
  // =============================================
  
  // Get popular repair issues
  app.get("/api/repairs/popular", async (req: Request, res: Response) => {
    const popularIssues = await storage.getPopularRepairIssues();
    
    // Get the appliance details for each issue
    const populatedIssues = await Promise.all(
      popularIssues.map(async (issue) => {
        const appliance = await storage.getAppliance(issue.applianceId);
        return {
          ...issue,
          appliance
        };
      })
    );
    
    res.json(populatedIssues);
  });
  
  // Get repair issues by appliance
  app.get("/api/appliances/:id/repairs", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    
    const appliance = await storage.getAppliance(id);
    if (!appliance) {
      return res.status(404).json({ message: "Appliance not found" });
    }
    
    const issues = await storage.getRepairIssuesByAppliance(id);
    res.json(issues);
  });
  
  // Get single repair issue with steps
  app.get("/api/repairs/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    
    const issue = await storage.getRepairIssue(id);
    if (!issue) {
      return res.status(404).json({ message: "Repair issue not found" });
    }
    
    const steps = await storage.getRepairSteps(id);
    const appliance = await storage.getAppliance(issue.applianceId);
    const parts = await storage.getRepairParts(id);
    
    res.json({
      ...issue,
      appliance,
      steps,
      parts
    });
  });
  
  // =============================================
  // Repair Steps Routes
  // =============================================
  
  // Get steps for a repair issue
  app.get("/api/repairs/:id/steps", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    
    const issue = await storage.getRepairIssue(id);
    if (!issue) {
      return res.status(404).json({ message: "Repair issue not found" });
    }
    
    const steps = await storage.getRepairSteps(id);
    res.json(steps);
  });
  
  // =============================================
  // Repair History Routes
  // =============================================
  
  // Get repair history for a user
  app.get("/api/history/:userId", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    
    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const history = await storage.getRepairHistory(userId);
    
    // Get the details for each repair issue in history
    const populatedHistory = await Promise.all(
      history.map(async (item) => {
        const issue = await storage.getRepairIssue(item.repairIssueId);
        if (!issue) return item;
        
        const appliance = await storage.getAppliance(issue.applianceId);
        return {
          ...item,
          issue,
          appliance
        };
      })
    );
    
    res.json(populatedHistory);
  });
  
  // Get recent repairs for a user
  app.get("/api/history/:userId/recent", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    
    const limitStr = req.query.limit as string | undefined;
    const limit = limitStr ? parseInt(limitStr) : 3;
    
    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const history = await storage.getRecentRepairHistory(userId, limit);
    
    // Get the details for each repair issue in history
    const populatedHistory = await Promise.all(
      history.map(async (item) => {
        const issue = await storage.getRepairIssue(item.repairIssueId);
        if (!issue) return item;
        
        const appliance = await storage.getAppliance(issue.applianceId);
        return {
          ...item,
          issue,
          appliance
        };
      })
    );
    
    res.json(populatedHistory);
  });
  
  // Update repair history progress
  app.post("/api/history/update", async (req: Request, res: Response) => {
    const schema = z.object({
      historyId: z.number(),
      lastStepCompleted: z.number(),
      completed: z.boolean().optional()
    });
    
    try {
      const { historyId, lastStepCompleted, completed } = schema.parse(req.body);
      
      const updatedHistory = await storage.updateRepairHistory(
        historyId,
        lastStepCompleted,
        completed
      );
      
      if (!updatedHistory) {
        return res.status(404).json({ message: "History record not found" });
      }
      
      res.json(updatedHistory);
    } catch (error) {
      res.status(400).json({ message: "Invalid request body" });
    }
  });
  
  // Start a new repair (create history record)
  app.post("/api/history/start", async (req: Request, res: Response) => {
    const schema = z.object({
      userId: z.number(),
      repairIssueId: z.number()
    });
    
    try {
      const { userId, repairIssueId } = schema.parse(req.body);
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const issue = await storage.getRepairIssue(repairIssueId);
      if (!issue) {
        return res.status(404).json({ message: "Repair issue not found" });
      }
      
      // Create a new history record
      const historyRecord = await storage.createRepairHistory({
        userId,
        repairIssueId,
        lastStepCompleted: 0,
        startedAt: new Date()
      });
      
      res.status(201).json(historyRecord);
    } catch (error) {
      res.status(400).json({ message: "Invalid request body" });
    }
  });
  
  // =============================================
  // Parts Routes
  // =============================================
  
  // Get parts for a repair issue
  app.get("/api/repairs/:id/parts", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    
    const issue = await storage.getRepairIssue(id);
    if (!issue) {
      return res.status(404).json({ message: "Repair issue not found" });
    }
    
    const parts = await storage.getRepairParts(id);
    res.json(parts);
  });
  
  return httpServer;
}
