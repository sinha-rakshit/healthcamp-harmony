
import { useEffect, useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  description,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`relative bg-white rounded-xl border border-gray-100 shadow-sm p-5 overflow-hidden transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-6 -mt-6"></div>
      
      <div className="flex items-center mb-3">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
          {icon}
        </div>
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      </div>
      
      <div className="flex items-baseline">
        <span
          className={`text-2xl font-bold transition-all duration-1000 ${
            isAnimated ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {value}
        </span>
        
        {change && (
          <div
            className={`ml-2 flex items-center text-xs font-medium ${
              change.isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {change.isPositive ? (
              <ArrowUp className="h-3 w-3 mr-0.5" />
            ) : (
              <ArrowDown className="h-3 w-3 mr-0.5" />
            )}
            {change.value}%
          </div>
        )}
      </div>
      
      {description && (
        <p className="mt-1 text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
};

export default StatsCard;
