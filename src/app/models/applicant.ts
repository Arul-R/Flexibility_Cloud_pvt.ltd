export interface Applicant {
    _id?: string;
    appliedJobId?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    techStack: string[];
    yearsOfExperience: number;
    address: string;
    city:string;
    status?: 'submitted' | 'rejected' | 'accepted';
    resume?: File;
}