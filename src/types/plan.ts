type HrTariff = {
    id: string;
    name: string;
    level: 'starter' | 'standard' | 'advanced';
    price: number;
    features: string[];
    recomendet?: boolean
};



type PlanUser = {
  id: number;
  name: string;
  plan?: string;
};
