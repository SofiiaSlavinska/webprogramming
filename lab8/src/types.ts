export type Status = 'todo' | 'in-progress' | 'done';

interface BaseTask {
  id: string;
  title: string;
  status: Status;
}

export interface Bug extends BaseTask {
  type: 'bug'; // Дискримінатор
  severity: 'low' | 'high' | 'critical';
}

export interface Feature extends BaseTask {
  type: 'feature'; // Дискримінатор
  expectedRelease?: string;
  priority: number;
}

// Discriminated Union: TypeScript тепер знає, що Task — це або Bug, або Feature
export type Task = Bug | Feature;