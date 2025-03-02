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

const PlacementDetails = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const placementData = [
    {
      year: "2024-25 (CAY)",
      totalStudents: 60,
      placedStudents: 45,
      percentage: "75%"
    },
    {
      year: "2023-24 (CAYm1)",
      totalStudents: 58,
      placedStudents: 40,
      percentage: "69%"
    },
    {
      year: "2022-23 (CAYm2)",
      totalStudents: 55,
      placedStudents: 38,
      percentage: "69%"
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
          4.5.1 Placement Details
        </h1>
      </div>

      <div className="container mx-auto px-[20%] pb-8">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold text-[#02959F] mb-6">
            Placement Statistics
          </h2>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Academic Year</TableHead>
                <TableHead>Total Number of Students</TableHead>
                <TableHead>Number of Placed Students</TableHead>
                <TableHead>Placement Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {placementData.map((row) => (
                <TableRow key={row.year}>
                  <TableCell className="font-medium">{row.year}</TableCell>
                  <TableCell>{row.totalStudents}</TableCell>
                  <TableCell>{row.placedStudents}</TableCell>
                  <TableCell>{row.percentage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-[#02959F]">
              Student Placement Details
            </h2>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate("/placement-details-upload")}
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
                  <SelectItem value="company">Company Wise</SelectItem>
                  <SelectItem value="package">Package Wise</SelectItem>
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

              {(filterType === "company" || filterType === "package") && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder={
                      filterType === "company" 
                        ? "Search by company name" 
                        : "Search by package"
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
                <TableHead>Student Name</TableHead>
                <TableHead>Enrollment Number</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead>Package (LPA)</TableHead>
                <TableHead>Placement Date</TableHead>
                <TableHead>Offer Letter</TableHead>
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

export default PlacementDetails;
