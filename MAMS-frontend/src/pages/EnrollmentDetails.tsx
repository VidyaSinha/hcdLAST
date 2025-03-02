
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const EnrollmentDetails = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const enrollmentData = [
    {
      year: "2024-25 (CAY)",
      sanctionedIntake: 60,
      admittedStudents: 60,
      ratio: "100%"
    },
    {
      year: "2023-24 (CAYm1)",
      sanctionedIntake: 60,
      admittedStudents: 60,
      ratio: "100%"
    },
    {
      year: "2022-23 (CAYm2)",
      sanctionedIntake: 60,
      admittedStudents: 42,
      ratio: "70%"
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
          Enrollment Details
        </h1>
      </div>

      <div className="container mx-auto px-[20%] pb-8">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold text-[#02959F] mb-6">
            Enrollment Ratio Details
          </h2>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Academic Year</TableHead>
                <TableHead>N (From Table 4.1)</TableHead>
                <TableHead>N1 (From Table 4.1)</TableHead>
                <TableHead>Enrollment Ratio [(N1/N)*100]</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrollmentData.map((row) => (
                <TableRow key={row.year}>
                  <TableCell className="font-medium">{row.year}</TableCell>
                  <TableCell>{row.sanctionedIntake}</TableCell>
                  <TableCell>{row.admittedStudents}</TableCell>
                  <TableCell>{row.ratio}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-[#02959F]">
              Student Details
            </h2>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate("/upload-documents")}
                className="bg-[#02959F] text-white hover:bg-[#037885] flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Details
              </Button>
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
                <TableHead>Academic Year</TableHead>
                <TableHead>Registration Form</TableHead>
                <TableHead>10th Marksheet</TableHead>
                <TableHead>12th Marksheet</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Table will be populated with actual data when integrated with backend */}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentDetails;
