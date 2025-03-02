import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

const AcademicPerformance = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const performanceData = [
    {
      year: "CAYm1 (2023-2024)",
      meanCGPA: "6.95",
      successfulStudents: "58",
      appearedStudents: "58",
      api: "6.95"
    },
    {
      year: "CAYm2 (2022-2023)",
      meanCGPA: "7.57",
      successfulStudents: "66",
      appearedStudents: "66",
      api: "7.57"
    },
    {
      year: "CAYm3 (2021-2022)",
      meanCGPA: "7.37",
      successfulStudents: "49",
      appearedStudents: "49",
      api: "7.37"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#02959F] py-6 mb-8 relative">
        <button 
          onClick={() => navigate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-200"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-white text-4xl font-bold text-center tracking-wider">
          Academic Performance
        </h1>
      </div>

      <div className="container mx-auto px-[20%] pb-8">
        <Card className="p-6 mb-8">
          <div className="flex justify-end mb-6">
            <Button
              onClick={() => navigate("/academic-performance-upload")}
              className="bg-[#02959F] text-white hover:bg-[#037885] flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Details
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Academic Year</TableHead>
                <TableHead>Mean CGPA (X)</TableHead>
                <TableHead>Total Successful Students (Y)</TableHead>
                <TableHead>Total Students Appeared (Z)</TableHead>
                <TableHead>API = X*(Y/Z)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {performanceData.map((row) => (
                <TableRow key={row.year}>
                  <TableCell>{row.year}</TableCell>
                  <TableCell>{row.meanCGPA}</TableCell>
                  <TableCell>{row.successfulStudents}</TableCell>
                  <TableCell>{row.appearedStudents}</TableCell>
                  <TableCell>{row.api}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4}>Average API = (AP1+AP2+AP3)/3</TableCell>
                <TableCell>7.29</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-[#02959F]">
              Student Details
            </h2>
            <div className="flex items-center gap-4">
              <Select onValueChange={setFilterType}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select filter type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="academic">Academic Year Wise</SelectItem>
                  <SelectItem value="enrollment">Enrollment No. Wise</SelectItem>
                  <SelectItem value="name">Name Wise</SelectItem>
                  <SelectItem value="gr">GR No. Wise</SelectItem>
                </SelectContent>
              </Select>

              {filterType === "academic" && (
                <Select onValueChange={setAcademicYear}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-25">2024-25</SelectItem>
                    <SelectItem value="2023-24">2023-24</SelectItem>
                    <SelectItem value="2022-23">2022-23</SelectItem>
                  </SelectContent>
                </Select>
              )}

              {(filterType === "enrollment" || filterType === "name" || filterType === "gr") && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder={
                      filterType === "enrollment" 
                        ? "Search by enrollment number" 
                        : filterType === "name"
                        ? "Search by name"
                        : "Search by GR number"
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-[300px]"
                  />
                </div>
              )}
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>GR No.</TableHead>
                <TableHead>Enrollment Number</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Grade (CGPA)</TableHead>
                <TableHead>Appeared for Exam</TableHead>
                <TableHead>Academic Year</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Table will be populated with actual data when integrated with backend */}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default AcademicPerformance;
