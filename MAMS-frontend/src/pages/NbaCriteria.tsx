
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const NbaCriteria = () => {
  const navigate = useNavigate();
  
  const criteria = [
    {
      number: 1,
      title: "Institutional Mission, Vision and Programme Educational Objectives",
      marks: 100
    },
    {
      number: 2,
      title: "Programme Outcome",
      marks: 100
    },
    {
      number: 3,
      title: "Programme Curriculum",
      marks: 100
    },
    {
      number: 4,
      title: "Students' Performance",
      marks: 100,
      route: "/criteria-four"
    },
    {
      number: 5,
      title: "Faculty Contributions",
      marks: 100
    },
    {
      number: 6,
      title: "Facilities and Technical Support",
      marks: 100
    },
    {
      number: 7,
      title: "Academic Support Units and Teaching-Learning Process",
      marks: 100
    },
    {
      number: 8,
      title: "Governance, Institutional Support and Financial Resources",
      marks: 100
    },
    {
      number: 9,
      title: "Continuous Improvement in Attainment of Outcomes",
      marks: 100
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
          NBA Criteria
        </h1>
      </div>

      <div className="w-[80%] mx-auto px-4 pb-8">
        <div className="space-y-4">
          {criteria.map((criterion) => (
            <Card
              key={criterion.number}
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white"
              onClick={() => criterion.route && navigate(criterion.route)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="bg-[#02959F] text-white w-12 h-12 flex items-center justify-center rounded-full shrink-0">
                    {criterion.number}
                  </div>
                  <h2 className="text-xl font-semibold text-[#02959F]">
                    {criterion.title}
                  </h2>
                </div>
                <div className="text-lg font-semibold text-[#02959F] whitespace-nowrap">
                  {criterion.marks} marks
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NbaCriteria;
