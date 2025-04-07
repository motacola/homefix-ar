import {
  users, 
  appliances, 
  repairIssues, 
  repairSteps, 
  repairHistory, 
  repairParts,
  type User, 
  type InsertUser, 
  type Appliance, 
  type InsertAppliance, 
  type RepairIssue, 
  type InsertRepairIssue, 
  type RepairStep, 
  type InsertRepairStep, 
  type RepairHistory, 
  type InsertRepairHistory, 
  type RepairPart, 
  type InsertRepairPart,
  ARMarker
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Appliance methods
  getAppliance(id: number): Promise<Appliance | undefined>;
  getAppliancesByType(type: string): Promise<Appliance[]>;
  getAllAppliances(): Promise<Appliance[]>;
  searchAppliances(query: string): Promise<Appliance[]>;
  createAppliance(appliance: InsertAppliance): Promise<Appliance>;
  
  // Repair issue methods
  getRepairIssue(id: number): Promise<RepairIssue | undefined>;
  getRepairIssuesByAppliance(applianceId: number): Promise<RepairIssue[]>;
  getPopularRepairIssues(): Promise<RepairIssue[]>;
  createRepairIssue(issue: InsertRepairIssue): Promise<RepairIssue>;
  
  // Repair step methods
  getRepairSteps(repairIssueId: number): Promise<RepairStep[]>;
  getRepairStep(id: number): Promise<RepairStep | undefined>;
  createRepairStep(step: InsertRepairStep): Promise<RepairStep>;
  
  // Repair history methods
  getRepairHistory(userId: number): Promise<RepairHistory[]>;
  getRecentRepairHistory(userId: number, limit: number): Promise<RepairHistory[]>;
  createRepairHistory(history: InsertRepairHistory): Promise<RepairHistory>;
  updateRepairHistory(id: number, lastStep: number, completed?: boolean): Promise<RepairHistory | undefined>;
  
  // Parts methods
  getRepairParts(repairIssueId: number): Promise<RepairPart[]>;
  createRepairPart(part: InsertRepairPart): Promise<RepairPart>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private appliances: Map<number, Appliance>;
  private repairIssues: Map<number, RepairIssue>;
  private repairSteps: Map<number, RepairStep>;
  private repairHistory: Map<number, RepairHistory>;
  private repairParts: Map<number, RepairPart>;
  
  private userId: number;
  private applianceId: number;
  private repairIssueId: number;
  private repairStepId: number;
  private repairHistoryId: number;
  private repairPartId: number;
  
  constructor() {
    // Initialize data stores
    this.users = new Map();
    this.appliances = new Map();
    this.repairIssues = new Map();
    this.repairSteps = new Map();
    this.repairHistory = new Map();
    this.repairParts = new Map();
    
    // Initialize ID counters
    this.userId = 1;
    this.applianceId = 1;
    this.repairIssueId = 1;
    this.repairStepId = 1;
    this.repairHistoryId = 1;
    this.repairPartId = 1;
    
    // Seed the database with initial data
    this.seedDatabase();
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const now = new Date();
    const user: User = { ...insertUser, id, createdAt: now };
    this.users.set(id, user);
    return user;
  }
  
  // Appliance methods
  async getAppliance(id: number): Promise<Appliance | undefined> {
    return this.appliances.get(id);
  }
  
  async getAppliancesByType(type: string): Promise<Appliance[]> {
    return Array.from(this.appliances.values()).filter(
      (appliance) => appliance.type === type,
    );
  }
  
  async getAllAppliances(): Promise<Appliance[]> {
    return Array.from(this.appliances.values());
  }
  
  async searchAppliances(query: string): Promise<Appliance[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.appliances.values()).filter(
      (appliance) => 
        appliance.name.toLowerCase().includes(lowerQuery) ||
        appliance.brand.toLowerCase().includes(lowerQuery) ||
        appliance.model.toLowerCase().includes(lowerQuery)
    );
  }
  
  async createAppliance(insertAppliance: InsertAppliance): Promise<Appliance> {
    const id = this.applianceId++;
    const appliance: Appliance = { ...insertAppliance, id };
    this.appliances.set(id, appliance);
    return appliance;
  }
  
  // Repair issue methods
  async getRepairIssue(id: number): Promise<RepairIssue | undefined> {
    return this.repairIssues.get(id);
  }
  
  async getRepairIssuesByAppliance(applianceId: number): Promise<RepairIssue[]> {
    return Array.from(this.repairIssues.values()).filter(
      (issue) => issue.applianceId === applianceId,
    );
  }
  
  async getPopularRepairIssues(): Promise<RepairIssue[]> {
    return Array.from(this.repairIssues.values()).filter(
      (issue) => issue.isPopular === true,
    );
  }
  
  async createRepairIssue(insertIssue: InsertRepairIssue): Promise<RepairIssue> {
    const id = this.repairIssueId++;
    const issue: RepairIssue = { ...insertIssue, id };
    this.repairIssues.set(id, issue);
    return issue;
  }
  
  // Repair step methods
  async getRepairSteps(repairIssueId: number): Promise<RepairStep[]> {
    return Array.from(this.repairSteps.values())
      .filter((step) => step.repairIssueId === repairIssueId)
      .sort((a, b) => a.stepNumber - b.stepNumber);
  }
  
  async getRepairStep(id: number): Promise<RepairStep | undefined> {
    return this.repairSteps.get(id);
  }
  
  async createRepairStep(insertStep: InsertRepairStep): Promise<RepairStep> {
    const id = this.repairStepId++;
    const step: RepairStep = { ...insertStep, id };
    this.repairSteps.set(id, step);
    return step;
  }
  
  // Repair history methods
  async getRepairHistory(userId: number): Promise<RepairHistory[]> {
    return Array.from(this.repairHistory.values())
      .filter((history) => history.userId === userId)
      .sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime());
  }
  
  async getRecentRepairHistory(userId: number, limit: number): Promise<RepairHistory[]> {
    return (await this.getRepairHistory(userId)).slice(0, limit);
  }
  
  async createRepairHistory(insertHistory: InsertRepairHistory): Promise<RepairHistory> {
    const id = this.repairHistoryId++;
    const history: RepairHistory = { ...insertHistory, id };
    this.repairHistory.set(id, history);
    return history;
  }
  
  async updateRepairHistory(id: number, lastStep: number, completed = false): Promise<RepairHistory | undefined> {
    const history = this.repairHistory.get(id);
    if (!history) return undefined;
    
    const updatedHistory: RepairHistory = { 
      ...history, 
      lastStepCompleted: lastStep,
      ...(completed ? { completedAt: new Date() } : {})
    };
    
    this.repairHistory.set(id, updatedHistory);
    return updatedHistory;
  }
  
  // Parts methods
  async getRepairParts(repairIssueId: number): Promise<RepairPart[]> {
    return Array.from(this.repairParts.values()).filter(
      (part) => part.repairIssueId === repairIssueId,
    );
  }
  
  async createRepairPart(insertPart: InsertRepairPart): Promise<RepairPart> {
    const id = this.repairPartId++;
    const part: RepairPart = { ...insertPart, id };
    this.repairParts.set(id, part);
    return part;
  }
  
  // Seed the database with initial data
  private seedDatabase() {
    // Seed appliances
    const samsungWasher = this.seedAppliance({
      name: "Samsung Washer WF45R6100",
      brand: "Samsung",
      model: "WF45R6100",
      type: "washing_machine",
      yearStart: 2018,
      yearEnd: 2020,
      imageUrl: "https://images.unsplash.com/photo-1581092921461-7031daec7321?w=500"
    });
    
    const lgWasher = this.seedAppliance({
      name: "LG Top Load WT7300CW",
      brand: "LG",
      model: "WT7300CW",
      type: "washing_machine",
      yearStart: 2019,
      yearEnd: 2021,
      imageUrl: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500"
    });
    
    const geRefrigerator = this.seedAppliance({
      name: "GE Profile PFE28KYNFS",
      brand: "GE",
      model: "PFE28KYNFS",
      type: "refrigerator",
      yearStart: 2020,
      yearEnd: 2022,
      imageUrl: "https://images.unsplash.com/photo-1585771724684-38269d6919c7?w=500"
    });
    
    const boschDishwasher = this.seedAppliance({
      name: "Bosch 300 Series Dishwasher",
      brand: "Bosch",
      model: "SHSM63W55N",
      type: "dishwasher",
      yearStart: 2018,
      yearEnd: 2022,
      imageUrl: "https://images.unsplash.com/photo-1648413653819-5f24dd6962af?w=500"
    });
    
    const lgMicrowave = this.seedAppliance({
      name: "LG NeoChef Microwave",
      brand: "LG",
      model: "LMC0975ST",
      type: "microwave",
      yearStart: 2019,
      yearEnd: 2022,
      imageUrl: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500"
    });
    
    // Seed repair issues
    const washerNotSpinning = this.seedRepairIssue({
      applianceId: samsungWasher.id,
      title: "Not Spinning",
      description: "Washer drum doesn't spin during cycle",
      difficulty: "medium",
      estimatedTime: "30-45 min",
      isPopular: true
    });
    
    const fridgeNotCooling = this.seedRepairIssue({
      applianceId: geRefrigerator.id,
      title: "Not Cooling",
      description: "Refrigerator isn't maintaining proper temperature",
      difficulty: "beginner",
      estimatedTime: "20-30 min",
      isPopular: true
    });
    
    const dishwasherNotDraining = this.seedRepairIssue({
      applianceId: boschDishwasher.id,
      title: "Not Draining",
      description: "Water remains in the bottom after cycle completes",
      difficulty: "medium",
      estimatedTime: "30-40 min",
      isPopular: true
    });
    
    const microwaveNotHeating = this.seedRepairIssue({
      applianceId: lgMicrowave.id,
      title: "Not Heating",
      description: "Microwave runs but doesn't heat food",
      difficulty: "advanced",
      estimatedTime: "45-60 min",
      isPopular: true
    });
    
    // Seed repair steps for washer not spinning
    this.seedRepairStep({
      repairIssueId: washerNotSpinning.id,
      stepNumber: 1,
      title: "Unplug the washer",
      description: "For safety, unplug the washer from the electrical outlet before beginning any repair.",
      imageUrl: "",
      arMarkers: [],
      isSafetyWarning: true
    });
    
    this.seedRepairStep({
      repairIssueId: washerNotSpinning.id,
      stepNumber: 2,
      title: "Remove Back Panel",
      description: "Locate and remove the 4 screws holding the back panel using a Phillips screwdriver.",
      imageUrl: "",
      arMarkers: [
        {
          id: "screw1",
          label: "Screw 1",
          position: { x: 0.25, y: 0.33 }
        },
        {
          id: "screw2",
          label: "Screw 2",
          position: { x: 0.75, y: 0.33 }
        },
        {
          id: "screw3",
          label: "Screw 3",
          position: { x: 0.25, y: 0.66 }
        },
        {
          id: "screw4",
          label: "Screw 4",
          position: { x: 0.75, y: 0.66 }
        }
      ],
      isSafetyWarning: false
    });
    
    // Additional steps would be added here
    this.seedRepairStep({
      repairIssueId: washerNotSpinning.id,
      stepNumber: 3,
      title: "Check the Drive Belt",
      description: "Inspect the drive belt for signs of wear or damage. If the belt is broken, it will need to be replaced.",
      imageUrl: "",
      arMarkers: [
        {
          id: "belt",
          label: "Drive Belt",
          position: { x: 0.5, y: 0.5 }
        }
      ],
      isSafetyWarning: false
    });
    
    // Seed repair parts
    this.seedRepairPart({
      repairIssueId: washerNotSpinning.id,
      name: "Drive Belt",
      partNumber: "6602-001655",
      description: "Replacement drive belt for Samsung washers",
      price: "$19.99",
      supplier: "iFixit",
      supplierUrl: "https://www.ifixit.com/products/samsung-washer-drive-belt",
      imageUrl: ""
    });
    
    // Create a demo user
    this.seedUser({
      username: "demo_user",
      password: "password123",
      email: "demo@example.com"
    });
    
    // Create repair history for the demo user
    this.seedRepairHistory({
      userId: 1, // demo_user
      repairIssueId: washerNotSpinning.id,
      lastStepCompleted: 2,
      startedAt: new Date(Date.now() - 86400000), // 1 day ago
    });
  }
  
  private seedAppliance(appliance: InsertAppliance): Appliance {
    const id = this.applianceId++;
    const newAppliance: Appliance = { ...appliance, id };
    this.appliances.set(id, newAppliance);
    return newAppliance;
  }
  
  private seedRepairIssue(issue: InsertRepairIssue): RepairIssue {
    const id = this.repairIssueId++;
    const newIssue: RepairIssue = { ...issue, id };
    this.repairIssues.set(id, newIssue);
    return newIssue;
  }
  
  private seedRepairStep(step: InsertRepairStep): RepairStep {
    const id = this.repairStepId++;
    const newStep: RepairStep = { ...step, id };
    this.repairSteps.set(id, newStep);
    return newStep;
  }
  
  private seedRepairPart(part: InsertRepairPart): RepairPart {
    const id = this.repairPartId++;
    const newPart: RepairPart = { ...part, id };
    this.repairParts.set(id, newPart);
    return newPart;
  }
  
  private seedUser(user: InsertUser): User {
    const id = this.userId++;
    const now = new Date();
    const newUser: User = { ...user, id, createdAt: now };
    this.users.set(id, newUser);
    return newUser;
  }
  
  private seedRepairHistory(history: InsertRepairHistory): RepairHistory {
    const id = this.repairHistoryId++;
    const newHistory: RepairHistory = { ...history, id };
    this.repairHistory.set(id, newHistory);
    return newHistory;
  }
}

export const storage = new MemStorage();
