export interface Ticket {
  id: string | number;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  attachments?: Attachment[];
  comments?: Comment[];
  createdBy?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface Comment {
  id: string | number;
  text: string;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
}

export interface Attachment {
  id: string | number;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface TicketListResponse {
  data: Ticket[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TicketListParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  sort?: string;
}

