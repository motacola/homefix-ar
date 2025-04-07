interface RepairCardProps {
  title: string;
  issue: string;
  difficulty: string;
  estimatedTime: string;
  imageUrl: string;
}

export default function RepairCard({ 
  title, 
  issue, 
  difficulty, 
  estimatedTime, 
  imageUrl 
}: RepairCardProps) {
  // Map difficulty to appropriate styling
  const getDifficultyStyle = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Capitalize the first letter of difficulty
  const formatDifficulty = (difficulty: string) => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      <div className="h-32 bg-gray-200 relative">
        <img 
          src={imageUrl || 'https://placehold.co/500x300?text=No+Image'} 
          className="w-full h-full object-cover" 
          alt={`${title} repair guide`} 
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <span className="text-white font-medium">{title}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <span className={`px-2 py-1 text-xs ${getDifficultyStyle('medium')} rounded-full mr-2`}>{issue}</span>
          <span className={`px-2 py-1 text-xs ${getDifficultyStyle(difficulty)} rounded-full`}>
            {formatDifficulty(difficulty)} Difficulty
          </span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center text-sm text-gray-500">
            <i className="fas fa-clock mr-1"></i>
            <span>{estimatedTime}</span>
          </div>
          <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
