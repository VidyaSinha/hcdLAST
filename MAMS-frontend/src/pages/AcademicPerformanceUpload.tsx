import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

const AcademicPerformanceUpload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [grNumbers, setGrNumbers] = useState<string[]>([]);
  const [selectedGrNumber, setSelectedGrNumber] = useState("");
  const [studentDetails, setStudentDetails] = useState<{ name: string; department: string } | null>(null);
  const [gradeHistory, setGradeHistory] = useState<File | null>(null);
  const [appearedForExam, setAppearedForExam] = useState<"yes" | "no" | "">("");

  // Fetch GR numbers from backend
  useEffect(() => {
    const fetchGrNumbers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/students/all");
        const data = await response.json();
        setGrNumbers(data.map((student: { gr_no: string }) => student.gr_no));
      } catch (error) {
        console.error("Error fetching GR numbers:", error);
      }
    };

    fetchGrNumbers();
  }, []);

  // Fetch student details when a GR No. is selected
  useEffect(() => {
    if (selectedGrNumber) {
      const fetchStudentDetails = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/students/${selectedGrNumber}`);
          const data = await response.json();
          setStudentDetails({ name: data.name, department: data.department });
        } catch (error) {
          console.error("Error fetching student details:", error);
          setStudentDetails(null);
        }
      };

      fetchStudentDetails();
    }
  }, [selectedGrNumber]);

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedGrNumber) {
      toast({ title: "Error", description: "Please select a GR Number", variant: "destructive" });
      return;
    }

    if (!gradeHistory) {
      toast({ title: "Error", description: "Please upload grade history", variant: "destructive" });
      return;
    }

    if (!appearedForExam) {
      toast({ title: "Error", description: "Please select whether student appeared for exam", variant: "destructive" });
      return;
    }

    const formData = new FormData();
    formData.append("gr_no", selectedGrNumber);
    formData.append("grade_history", gradeHistory);
    formData.append("appeared_for_exam", appearedForExam);

    try {
      const response = await fetch("http://localhost:5000/api/academic-performance", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit academic performance details");
      }

      toast({ title: "Success", description: "Academic performance details uploaded successfully" });
      navigate("/academic-performance");

      // Remove the submitted GR number from the students list
      setGrNumbers(prevGrNumbers => prevGrNumbers.filter(gr => gr !== selectedGrNumber));
    } catch (error) {
      console.error("Error submitting academic performance details:", error);
      toast({ title: "Error", description: "Failed to submit academic performance details", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#02959F] py-6 mb-8 relative">
        <button onClick={() => navigate(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-200">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-white text-4xl font-bold text-center tracking-wider">Add Academic Performance Details</h1>
      </div>

      <div className="container mx-auto px-[20%] pb-8">
        <Card className="p-8 bg-white">
          <div className="mb-8">
            <Label htmlFor="gr-no" className="text-lg font-medium text-[#02959F] mb-2">
              Select Enrollment Number (GR No.)
            </Label>
            <Select value={selectedGrNumber} onValueChange={setSelectedGrNumber}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select GR No." />
              </SelectTrigger>
              <SelectContent>
                {grNumbers.map((gr) => (
                  <SelectItem key={gr} value={gr}>{gr}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {studentDetails && (
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-700"><strong>Name:</strong> {studentDetails.name}</p>
              <p className="text-gray-700"><strong>Department:</strong> {studentDetails.department}</p>
            </div>
          )}

          {selectedGrNumber && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="gradeHistory">Grade History</Label>
                <div className="flex items-center gap-4">
                  <Input id="gradeHistory" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setGradeHistory(e.target.files?.[0] || null)} className="flex-1" />
                  <Upload className="text-[#02959F] h-5 w-5" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Has student appeared for exam?</Label>
                <RadioGroup value={appearedForExam} onValueChange={(value) => setAppearedForExam(value as "yes" | "no")} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full bg-[#02959F] text-white hover:bg-[#037885]">Submit Details</Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AcademicPerformanceUpload;
