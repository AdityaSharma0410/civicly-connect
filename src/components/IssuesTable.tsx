import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, MapPin, Calendar } from "lucide-react";

type IssueStatus = "reported" | "progress" | "resolved";

interface Issue {
  id: string;
  title: string;
  category: string;
  status: IssueStatus;
  location: string;
  reportedDate: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
}

const mockIssues: Issue[] = [
  {
    id: "ISS-001",
    title: "Pothole on Main Street",
    category: "Roads",
    status: "progress",
    location: "Main St & 1st Ave",
    reportedDate: "2024-01-15",
    priority: "High",
  },
  {
    id: "ISS-002", 
    title: "Broken Street Light",
    category: "Lighting",
    status: "reported",
    location: "Park Avenue",
    reportedDate: "2024-01-14",
    priority: "Medium",
  },
  {
    id: "ISS-003",
    title: "Water Leak in Residential Area",
    category: "Water Supply",
    status: "resolved",
    location: "Oak Street",
    reportedDate: "2024-01-10",
    priority: "Urgent",
  },
  {
    id: "ISS-004",
    title: "Overflowing Garbage Bin",
    category: "Cleanliness",
    status: "progress",
    location: "Central Park",
    reportedDate: "2024-01-13",
    priority: "Low",
  },
  {
    id: "ISS-005",
    title: "Fallen Tree Blocking Road",
    category: "Obstructions",
    status: "reported",
    location: "Elm Street",
    reportedDate: "2024-01-16",
    priority: "Urgent",
  },
];

const getStatusBadge = (status: IssueStatus) => {
  const variants = {
    reported: "status-reported",
    progress: "status-progress", 
    resolved: "status-resolved",
  } as const;
  
  return (
    <Badge variant={variants[status]}>
      {status === "progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const getPriorityBadge = (priority: string) => {
  const variants = {
    Low: "secondary",
    Medium: "warning",
    High: "destructive",
    Urgent: "destructive",
  } as const;
  
  return (
    <Badge variant={variants[priority as keyof typeof variants] || "secondary"}>
      {priority}
    </Badge>
  );
};

export function IssuesTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Recent Issues
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Issue ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockIssues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell className="font-medium">{issue.id}</TableCell>
                <TableCell>{issue.title}</TableCell>
                <TableCell>{issue.category}</TableCell>
                <TableCell>{getStatusBadge(issue.status)}</TableCell>
                <TableCell>{getPriorityBadge(issue.priority)}</TableCell>
                <TableCell className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  {issue.location}
                </TableCell>
                <TableCell className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  {issue.reportedDate}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}