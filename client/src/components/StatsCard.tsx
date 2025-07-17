import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  subtitle?: string;
}

const StatsCard = ({
  title,
  value,
  icon: Icon,
  iconBgColor,
  iconColor,
  change,
  changeType = "neutral",
  subtitle,
}: StatsCardProps) => {
  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-green-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-slate-500";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${iconBgColor}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
      
      {(change || subtitle) && (
        <div className="mt-4 flex items-center">
          {change && (
            <span className={`text-sm font-medium ${getChangeColor()}`}>
              {change}
            </span>
          )}
          {subtitle && (
            <span className="text-slate-500 text-sm ml-2">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatsCard;
