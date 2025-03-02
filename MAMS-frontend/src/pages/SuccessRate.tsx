import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SuccessRate = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState([
    {
      yearOfEntry: "CAY (2024-2025)",
      n1n2n3: "60+00+00",
      firstYear: "",
      secondYear: "",
      thirdYear: "",
      fourthYear: ""
    },
    {
      yearOfEntry: "CAYm1 (2023- 2024)",
      n1n2n3: "60+06+00",
      firstYear: "60+NA+00",
      secondYear: "",
      thirdYear: "",
      fourthYear: ""
    },
    {
      yearOfEntry: "CAYm2 (2022-2023)",
      n1n2n3: "42+16+00",
      firstYear: "36+NA+00",
      secondYear: "33+14+00",
      thirdYear: "",
      fourthYear: ""
    },
    {
      yearOfEntry: "CAYm3 (2021-2022)",
      n1n2n3: "60+06+00",
      firstYear: "59+NA+00",
      secondYear: "57+06+00",
      thirdYear: "57+06+00",
      fourthYear: ""
    },
    {
      yearOfEntry: "CAYm4 (2020-2021)",
      n1n2n3: "33+16+00",
      firstYear: "18+NA+00",
      secondYear: "18+15+00",
      thirdYear: "18+15+00",
      fourthYear: "18+15+00"
    },
    {
      yearOfEntry: "CAYm5 (2019-20)",
      n1n2n3: "48+00+00",
      firstYear: "33+NA+00",
      secondYear: "30+NA+00",
      thirdYear: "29+NA+00",
      fourthYear: "29+NA+00"
    },
    {
      yearOfEntry: "CAYm6 (2018-19)",
      n1n2n3: "42+00+00",
      firstYear: "32+NA+00",
      secondYear: "29+NA+00",
      thirdYear: "28+NA+00",
      fourthYear: "28+NA+00"
    }
  ]);

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
          Success Rate
        </h1>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Add Details button */}
        <div className="flex justify-end mb-4">
          <Button variant="default" className="bg-[#02959F]">
            Add Details
          </Button>
        </div>
        
        {/* Table section */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Year of Entry</TableHead>
                <TableHead>N1N2N3</TableHead>
                <TableHead>First Year</TableHead>
                <TableHead>Second Year</TableHead>
                <TableHead>Third Year</TableHead>
                <TableHead>Fourth Year</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentData.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>{student.yearOfEntry}</TableCell>
                  <TableCell>{student.n1n2n3}</TableCell>
                  <TableCell>{student.firstYear}</TableCell>
                  <TableCell>{student.secondYear}</TableCell>
                  <TableCell>{student.thirdYear}</TableCell>
                  <TableCell>{student.fourthYear}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default SuccessRate;
