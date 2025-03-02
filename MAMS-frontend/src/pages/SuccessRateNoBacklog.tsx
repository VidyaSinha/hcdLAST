import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const SuccessRateNoBacklog = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const tableData = [
    {
      period: "LYG (2020-2024)",
      n1n2n3: "49",
      graduated: "33",
      successIndex: "0.67"
    },
    {
      period: "LYGm1 (2019-2023)",
      n1n2n3: "48",
      graduated: "29",
      successIndex: "0.60"
    },
    {
      period: "LYGm2 (2018-2022)",
      n1n2n3: "42",
      graduated: "28",
      successIndex: "0.66"
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
          Success Rate without Backlogs
        </h1>
      </div>

      <div className="container mx-auto px-[20%] pb-8">
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold text-[#02959F] mb-4">Student Success Rates without Backlogs</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Period</TableHead>
                <TableHead>N1+N2+N3 (As Mentioned Above)</TableHead>
                <TableHead>Number of students who have graduated without backlogs</TableHead>
                <TableHead>Success Index (SI)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.period}>
                  <TableCell>{row.period}</TableCell>
                  <TableCell>{row.n1n2n3}</TableCell>
                  <TableCell>{row.graduated}</TableCell>
                  <TableCell>{row.successIndex}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3}>Average Success Index</TableCell>
                <TableCell>0.65</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}></TableCell>
                <TableCell>15*0.65=9.75</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[#02959F]">Student Details</h2>
            <div className="flex items-center gap-4">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select filter type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gr_no">GR No.</SelectItem>
                  <SelectItem value="enrollment">Enrollment Number</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="grade">Grade (CGPA)</SelectItem>
                  <SelectItem value="exam">Appeared for Exam</SelectItem>
                  <SelectItem value="academic_year">Academic Year</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-64"
              />
              <Button variant="default" className="bg-[#02959F]">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Enrollment Number</TableHead>
                <TableHead>Grade History</TableHead>
                <TableHead>Backlog</TableHead>
                <TableHead>Backlog Semesters</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentData.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>{student.enrollmentNumber}</TableCell>
                  <TableCell>
                    <Button variant="link">
                      View PDF
                    </Button>
                  </TableCell>
                  <TableCell>{student.backlog}</TableCell>
                  <TableCell>{student.backlogSems?.join(', ') || '-'}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default SuccessRateNoBacklog;
