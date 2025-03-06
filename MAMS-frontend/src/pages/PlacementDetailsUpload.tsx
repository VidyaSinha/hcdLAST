import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

interface Student {
  gr_no: string;
  name: string;
}

const PlacementDetailsUpload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedGrNumber, setSelectedGrNumber] = useState("");
  const [status, setStatus] = useState("");
  const [proof, setProof] = useState<File | null>(null);

  useEffect(() => {
    // Fetch students from the backend
    const fetchStudents = async () => {
      try {
        const response = await fetch("https://madms-backend.onrender.com/api/students");
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
        toast({
          title: "Error",
          description: "Failed to fetch student data",
          variant: "destructive",
        });
      }
    };

    fetchStudents();
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedGrNumber) {
      toast({
        title: "Error",
        description: "Please select a GR Number",
        variant: "destructive",
      });
      return;
    }

    if (!status) {
      toast({
        title: "Error",
        description: "Please select student status",
        variant: "destructive",
      });
      return;
    }

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!proof || !allowedTypes.includes(proof.type)) {
      toast({
        title: "Error",
        description: "Please upload either a PDF document or an image (JPEG, PNG)",
        variant: "destructive",
      });
      return;
    }

    // Submit placement details
    const formData = new FormData();
    formData.append("gr_no", selectedGrNumber);
    formData.append("status", status);
    formData.append("proof", proof);

    try {
      console.log("Submitting form data:", {
        gr_no: selectedGrNumber,
        status,
        proofName: proof.name
      });

      const response = await fetch("https://madms-backend.onrender.com/api/placement-details", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit details");
      }

      // Remove the submitted GR number from the students list
      setStudents(prevStudents => prevStudents.filter(student => student.gr_no !== selectedGrNumber));
      
      // Reset form fields
      setSelectedGrNumber("");
      setStatus("");
      setProof(null);

      toast({
        title: "Success",
        description: "Placement details uploaded successfully",
      });

      navigate("/placement-details");
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit details",
        variant: "destructive",
      });
    }
  };

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
          Add Placement Details
        </h1>
      </div>

      <div className="container mx-auto px-[20%] pb-8">
        <Card className="p-8 bg-white">
          <div className="mb-8">
            <Label htmlFor="gr-no" className="text-lg font-medium text-[#02959F] mb-2">
              Select GR No.
            </Label>
            <Select value={selectedGrNumber} onValueChange={setSelectedGrNumber}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select GR No." />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.gr_no} value={student.gr_no}>
                    {student.gr_no} - {student.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedGrNumber && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="status">Student Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select student status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="placement">Placed in Company/Government Sector</SelectItem>
                    <SelectItem value="higher-studies">Higher Studies</SelectItem>
                    <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-4">
                <Label htmlFor="proof">Upload Document Proof (PDF or Image)</Label>
                <Input
                  id="proof"
                  type="file"
                  accept=".pdf, .jpg, .jpeg, .png"
                  onChange={(e) => setProof(e.target.files ? e.target.files[0] : null)}
                  className="mt-1"
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-[#02959F] text-white hover:bg-[#037885]"
                >
                  Submit Details
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default PlacementDetailsUpload;
