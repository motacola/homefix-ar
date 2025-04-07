interface ResourceCardProps {
  title: string;
  description: string;
  icon: string;
  iconBgColor: string;
  iconColor: string;
  buttonText: string;
}

export default function ResourceCard({ 
  title, 
  description, 
  icon, 
  iconBgColor, 
  iconColor, 
  buttonText 
}: ResourceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 p-4">
      <div className="flex items-start">
        <div className={`rounded-full ${iconBgColor} p-3 mr-4`}>
          <i className={`${icon} ${iconColor} text-xl`}></i>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-1">{title}</h4>
          <p className="text-sm text-gray-500 mb-2">{description}</p>
          <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
