
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  const navigate = useNavigate();

  const cards = [
    { 
      title: "NBA", 
      description: "National Board of Accreditation",
      route: "/nba-criteria" 
    },
    { 
      title: "NAAC", 
      description: "National Assessment and Accreditation Council",
      route: "#" 
    },
    { 
      title: "COE", 
      description: "Centre of Excellence", 
      route: "#" 
    },
    { 
      title: "NIRF", 
      description: "National Institutional Ranking Framework",
      route: "#" 
    },
    { 
      title: "QS", 
      route: "#" 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#02959F] py-6 mb-8">
        <h1 className="text-white text-4xl font-bold text-center tracking-wider">
          Dashboard
        </h1>
      </div>

      <div className="container mx-auto px-[20%]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Card
              key={card.title}
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white"
              onClick={() => navigate(card.route)}
            >
              <h2 className="text-2xl font-semibold text-[#02959F] mb-2">
                {card.title}
              </h2>
              {card.description && (
                <p className="text-gray-600 text-sm">{card.description}</p>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
