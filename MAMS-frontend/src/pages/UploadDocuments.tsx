import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const UploadDocuments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedGr, setSelectedGr] = useState("");
  const [tenthMarksheet, setTenthMarksheet] = useState<File | null>(null);
  const [twelfthMarksheet, setTwelfthMarksheet] = useState<File | null>(null);
  const [registrationForm, setRegistrationForm] = useState<File | null>(null);
  const [gujcetResult, setGujcetResult] = useState<File | null>(null);
  const [grNumbers, setGrNumbers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch GR numbers from API
  useEffect(() => {
    const fetchGrNumbers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/students/available-for-documents");
        const data = await response.json();
        setGrNumbers(data.map((student: { gr_no: string }) => student.gr_no));
      } catch (error) {
        console.error("Error fetching GR numbers:", error);
        setError("Failed to load GR numbers");
      } finally {
        setLoading(false);
      }
    };

    fetchGrNumbers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!selectedGr) {
        toast({
          title: "Error",
          description: "Please select a GR number",
          variant: "destructive",
        });
        return;
      }

      if (!tenthMarksheet || !twelfthMarksheet || !registrationForm || !gujcetResult) {
        toast({
          title: "Error",
          description: "Please upload all required documents",
          variant: "destructive",
        });
        return;
      }

      const formData = new FormData();
      formData.append('gr_no', selectedGr);
      formData.append('marks10', tenthMarksheet);
      formData.append('marks12', twelfthMarksheet);
      formData.append('registration_form', registrationForm);
      formData.append('gujcet', gujcetResult);

      const response = await fetch('http://localhost:5000/api/documents/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to upload documents');
      }

      const data = await response.json();
      
      toast({
        title: "Success",
        description: "Documents uploaded successfully",
      });

      // Refresh the GR numbers list
      const updatedGrResponse = await fetch("http://localhost:5000/api/students/available-for-documents");
      const updatedGrData = await updatedGrResponse.json();
      setGrNumbers(updatedGrData.map((student: { gr_no: string }) => student.gr_no));
      
      // Reset form
      setSelectedGr("");
      setTenthMarksheet(null);
      setTwelfthMarksheet(null);
      setRegistrationForm(null);
      setGujcetResult(null);
      
      navigate("/enrollment-details");
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload documents",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
          Enrollment Details
        </h1>
      </div>

      <div className="container mx-auto px-[20%] pb-8">
        <div className="bg-white rounded-lg shadow p-8">
          <div className="mb-8">
            <Label htmlFor="enrollment" className="text-lg font-medium text-[#02959F] mb-2">
              Select GR Number
            </Label>
            {loading ? (
              <p className="text-gray-500">Loading GR numbers...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <Select value={selectedGr} onValueChange={setSelectedGr}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select GR number" />
                </SelectTrigger>
                <SelectContent>
                  {grNumbers.length > 0 ? (
                    grNumbers.map((number) => (
                      <SelectItem key={number} value={number}>
                        {number}
                      </SelectItem>
                    ))
                  ) : (
                    <p className="text-gray-500 px-4 py-2">No GR numbers available</p>
                  )}
                </SelectContent>
              </Select>
            )}
          </div>

          {selectedGr && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="tenth" className="text-lg font-medium text-gray-700">
                    10th Marksheet (PDF or Image)
                  </Label>
                  <Input
                    id="tenth"
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={(e) => setTenthMarksheet(e.target.files?.[0] || null)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="twelfth" className="text-lg font-medium text-gray-700">
                    12th Marksheet (PDF or Image)
                  </Label>
                  <Input
                    id="twelfth"
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={(e) => setTwelfthMarksheet(e.target.files?.[0] || null)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="registration" className="text-lg font-medium text-gray-700">
                    Registration Form (PDF or Image)
                  </Label>
                  <Input
                    id="registration"
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={(e) => setRegistrationForm(e.target.files?.[0] || null)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="gujcet" className="text-lg font-medium text-gray-700">
                    GUJCET Marksheet (PDF or Image)
                  </Label>
                  <Input
                    id="gujcet"
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={(e) => setGujcetResult(e.target.files?.[0] || null)}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-[#02959F] text-white hover:bg-[#037885]"
                >
                  Submit Documents
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;
