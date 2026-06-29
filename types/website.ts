
export interface WebsiteType {
    _id: string;
    name: string;
    url: string;
    description: string;
    tags: string[];
    isPremium: boolean;
    likesCount: number;
    createdAt: Date;
    updatedAt: Date;
}