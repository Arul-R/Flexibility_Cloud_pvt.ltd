// export interface Enquiry {
//     service?: 'Training' | 'Project';
//     orgName: string;
//     email: string;
//     phone: string;
//     reqTechStack: string[] | string;
//     address: string;
//     city: string;
//     description: string;
//   }
  


export interface Enquiry {
  service: 'Training' | 'Project';
  orgName: string;
  email: string;
  phone: string;
  reqTechStack: string[];
  address: string;
  city: string;
  description: string;
  createdAt?: Date;
}