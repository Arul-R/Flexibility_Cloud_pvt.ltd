export interface Enquiry {
    _id?: string;
    service?: 'Training' | 'Project';
    orgName: string;
    email: string;
    phone: string;
    reqTechStack: string[];
    address: string;
    city:string;
    description: string;
}
