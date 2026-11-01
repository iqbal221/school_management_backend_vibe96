export interface ISchoolLeadership {
 id: string; 
 founderName: string; 
 principalName: string; 
 founderImage: string | null; 
 principalImage: string | null; 
 createdAt: Date; 
 updatedAt: Date; 
}

export interface ICreateSchoolLeadership
{ id: string; 
  founderName: string; 
  founderImage: string | null; 
  principalName: string; 
  principalImage: string | null; 
  createdAt: Date; 
  updatedAt: Date; 
}

export interface IUpdateSchoolLeadership {
  founderName: string;
  founderImage?: string;
  principalName: string;
  principalImage?: string;
}