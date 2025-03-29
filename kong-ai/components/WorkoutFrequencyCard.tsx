import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Check } from "lucide-react";

interface WorkoutFrequencyCardProps {
  daysOfWeek: string[];
  selectedDays: string[];
  toggleDay: (day: string) => void;
}

function WorkoutFrequencyCard({
  daysOfWeek,
  selectedDays,
  toggleDay,
}: WorkoutFrequencyCardProps) {
  return (
    <Card className="backdrop-blur-sm border-grey-200 mt-4">
      <CardContent className="p-6 md:p-8">
        <div className="space-y-6">
          <h3 className="text-xl font-bold flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-green-700" />
            Workout Frequency
          </h3>

          <div className="space-y-6 mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <div>
              <div className="flex justify-between mb-2">
                <span></span>
                <span className="font-medium text-green-700">
                  {selectedDays.length} days selected
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mt-4">
                {daysOfWeek.map((day) => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`
                      relative flex flex-col items-center justify-center p-2 sm:p-4 rounded-lg border 
                      ${
                        selectedDays.includes(day)
                          ? "ring-2 ring-green-700 bg-green-700 bg-opacity-10"
                          : "hover:bg-zinc-100"
                      }
                    `}
                    aria-pressed={selectedDays.includes(day)}
                    type="button"
                  >
                    <span className="text-xs sm:text-sm font-medium">
                      {day.substring(0, 3)}
                    </span>

                    {selectedDays.includes(day) && (
                      <div className="absolute top-1 right-1">
                        <Check className="h-3 w-3 text-green-700" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Select the days you want to work out
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutFrequencyCard;