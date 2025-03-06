import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Eye, Edit, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const CriteriaFour = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    gr_no: "",
    enroll_no: "",
    academic_year: ""
  });

  const subCriteria = [
    {
      number: "4.1",
      title: "Enrollment Ratio",
      marks: 20,
      details: "enrollment-details"
    },
    {
      number: "4.2",
      title: "Success Rate in Stipulated Period of the Program",
      marks: 20,
      details: "success-rate",
      subCriteria: [
        {
          number: "4.2.1",
          title: "Success Rate Without Backlog",
          marks: 10,
          details: "success-rate-no-backlog"
        },
        {
          number: "4.2.2",
          title: "Success Rate With Backlog",
          marks: 10,
          details: "success-rate-with-backlog"
        }
      ]
    },
    {
      number: "4.3",
      title: "Academic Performance in Second Year",
      marks: 10,
      details: "academic-performance"
    },
    {
      number: "4.4",
      title: "Placement, Higher Studies and Entrepreneurship",
      marks: 30,
      details: "placement-details"
    },
    {
      number: "4.5",
      title: "Professional Activities",
      marks: 20,
      details: "professional-activities",
      subCriteria: [
        {
          number: "4.5.1",
          title: "Professional Societies/Chapters and Organizing Engineering Events",
          marks: 5,
          details: "professional-societies"
        },
        {
          number: "4.5.2",
          title: "Publication of Technical Magazines and Newsletter",
          marks: 5,
          details: "publications"
        },
        {
          number: "4.5.3",
          title: "Participation at Inter-Institution Events by Students of Program of Study",
          marks: 10,
          details: "inter-institution-events"
        }
      ]
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.gr_no || !formData.enroll_no || !formData.academic_year) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
  
    const token = localStorage.getItem("token"); // Get JWT token
  
    try {
      const response = await fetch("https://madms-backend.onrender.com/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token for authentication
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Success",
          description: "Student details submitted successfully",
        });
        setShowForm(false);
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to submit student details",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
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
          Criteria 4: Students' Performance
        </h1>
      </div>

      <div className="container mx-auto px-4 pb-8 w-[80%]">
        <div className="mb-6 flex justify-end">
          <Button
            onClick={() => setShowForm(true)}
            className="bg-[#02959F] text-white hover:bg-[#037885] flex items-center gap-2"
          >
            <User className="h-4 w-4" />
            Student Basic Details
          </Button>
        </div>

        {showForm ? (
          <Card className="p-6 bg-white mb-6">
            <h2 className="text-2xl font-semibold text-[#02959F] mb-6">Basic Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full"
                  placeholder="Enter full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="grNo" className="text-gray-700">GR Number</Label>
                <Input
                  id="grNo"
                  value={formData.gr_no}
                  onChange={(e) => setFormData({...formData, gr_no: e.target.value})}
                  className="w-full"
                  placeholder="Enter GR number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="enrollNo" className="text-gray-700">Enrollment Number</Label>
                <Input
                  id="enrollNo"
                  value={formData.enroll_no}
                  onChange={(e) => setFormData({...formData, enroll_no: e.target.value})}
                  className="w-full"
                  placeholder="Enter enrollment number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="academicYear" className="text-gray-700">Academic Year</Label>
                <Select
                  value={formData.academic_year}
                  onValueChange={(value) => setFormData({...formData, academic_year: value})}
                >
                  <SelectTrigger id="academicYear" className="w-full">
                    <SelectValue placeholder="Select academic year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-25">2024-25</SelectItem>
                    <SelectItem value="2023-24">2023-24</SelectItem>
                    <SelectItem value="2022-23">2022-23</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-[#02959F] text-white hover:bg-[#037885]"
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        ) : (
          <div className="space-y-6">
            {subCriteria.map((criterion) => (
              <Card key={criterion.number} className="p-6 bg-white hover:shadow-lg transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold text-[#02959F]">
                          {criterion.number} - {criterion.title}
                        </h2>
                        <div className="flex gap-2 ml-4">
                          {criterion.details && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="flex items-center gap-2 text-[#02959F] hover:text-white hover:bg-[#02959F]"
                              onClick={() => navigate(`/${criterion.details}`)}
                            >
                              <Eye className="h-4 w-4" />
                              See Details
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex items-center gap-2 text-[#02959F] hover:text-white hover:bg-[#02959F]"
                          >
                            <Edit className="h-4 w-4" />
                            Edit Marks
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-[#02959F] whitespace-nowrap">
                      {criterion.marks} marks
                    </div>
                  </div>

                  {criterion.subCriteria && (
                    <div className="ml-8 space-y-3">
                      {criterion.subCriteria.map((sub) => (
                        <div key={sub.number} className="flex items-start justify-between gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-[#02959F]">
                              {sub.number} - {sub.title}
                            </h3>
                            <div className="flex gap-2 mt-2">
                              {sub.details && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="flex items-center gap-2 text-[#02959F] hover:text-white hover:bg-[#02959F]"
                                  onClick={() => navigate(`/${sub.details}`)}
                                >
                                  <Eye className="h-4 w-4" />
                                  See Details
                                </Button>
                              )}
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="flex items-center gap-2 text-[#02959F] hover:text-white hover:bg-[#02959F]"
                              >
                                <Edit className="h-4 w-4" />
                                Edit Marks
                              </Button>
                            </div>
                          </div>
                          <div className="text-lg font-semibold text-[#02959F] whitespace-nowrap">
                            {sub.marks} marks
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CriteriaFour;
