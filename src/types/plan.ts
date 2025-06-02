type HrTariff = {
    id: string;
    name: string;
    level: 'starter' | 'standard' | 'advanced';
    price: number;
    features: string[];
};
