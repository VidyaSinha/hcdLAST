
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

const SuccessRateUpload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedEnrollment, setSelectedEnrollment] = useState("");
  const [gradeHistory, setGradeHistory] = useState<File | null>(null);
  const [hasBacklog, setHasBacklog] = useState<"yes" | "no" | "">("");
  const [selectedSemesters, setSelectedSemesters] = useState<string[]>([]);

  // Dummy enrollment numbers (will be fetched from backend later)
  const enrollmentNumbers = [
    "21012011001",
    "21012011002",
    "21012011003",
    "21012011004",
    "21012011005",
  ];

  const semesters = Array.from({ length: 8 }, (_, i) => ({
    value: String(i + 1),
    label: `Semester ${i + 1}`
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedEnrollment) {
      toast({
        title: "Error",
        description: "Please select an enrollment number",
        variant: "destructive",
      });
      return;
    }

    if (!gradeHistory) {
      toast({
        title: "Error",
        description: "Please upload grade history",
        variant: "destructive",
      });
      return;
    }

    if (!hasBacklog) {
      toast({
        title: "Error",
        description: "Please select whether student has backlog",
        variant: "destructive",
      });
      return;
    }

    if (hasBacklog === "yes" && selectedSemesters.length === 0) {
      toast({
        title: "Error",
        description: "Please select semesters with backlog",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Success rate details uploaded successfully",
    });
    navigate("/success-rate");
  };

  const handleSemesterSelection = (semester: string) => {
    setSelectedSemesters(prev => {
      if (prev.includes(semester)) {
        return prev.filter(s => s !== semester);
      }
      return [...prev, semester];
    });
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
          Success Rate Details
        </h1>
      </div>

      <div className="container mx-auto px-[20%] pb-8">
        <Card className="p-8 bg-white">
          <div className="mb-8">
            <Label htmlFor="enrollment" className="text-lg font-medium text-[#02959F] mb-2">
              Select Enrollment Number
            </Label>
            <Select
              value={selectedEnrollment}
              onValueChange={setSelectedEnrollment}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select enrollment number" />
              </SelectTrigger>
              <SelectContent>
                {enrollmentNumbers.map((number) => (
                  <SelectItem key={number} value={number}>
                    {number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedEnrollment && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="gradeHistory">Grade History</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="gradeHistory"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setGradeHistory(e.target.files?.[0] || null)}
                    className="flex-1"
                  />
                  <Upload className="text-[#02959F] h-5 w-5" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Has backlog?</Label>
                <RadioGroup
                  value={hasBacklog}
                  onValueChange={(value) => {
                    setHasBacklog(value as "yes" | "no");
                    if (value === "no") {
                      setSelectedSemesters([]);
                    }
                  }}
                  className="flex gap-4"
                >
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

              {hasBacklog === "yes" && (
                <div className="space-y-2">
                  <Label>Select semesters with backlog</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {semesters.map((semester) => (
                      <Button
                        key={semester.value}
                        type="button"
                        variant={selectedSemesters.includes(semester.value) ? "default" : "outline"}
                        className={`${
                          selectedSemesters.includes(semester.value)
                            ? "bg-[#02959F] text-white"
                            : "text-[#02959F]"
                        }`}
                        onClick={() => handleSemesterSelection(semester.value)}
                      >
                        {semester.label}
                      </Button>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Selected semesters: {selectedSemesters.map(s => `Semester ${s}`).join(", ") || "None"}
                  </div>
                </div>
              )}

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

export default SuccessRateUpload;