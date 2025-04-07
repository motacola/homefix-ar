interface PopularRepairCardProps {
  title: string;
  applianceName: string;
  difficulty: string;
  imageUrl: string;
}

export default function PopularRepairCard({ 
  title, 
  applianceName, 
  difficulty, 
  imageUrl 
}: PopularRepairCardProps) {
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
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex border border-gray-200">
      <div className="w-1/3 bg-gray-200">
        <img 
          src={imageUrl || 'https://placehold.co/200x200?text=No+Image'} 
          className="w-full h-full object-cover" 
          alt={`${title} repair`} 
        />
      </div>
      <div className="w-2/3 p-3">
        <h4 className="font-medium text-gray-900 mb-1">{title}</h4>
        <p className="text-sm text-gray-500 mb-2">{applianceName}</p>
        <span className={`px-2 py-1 text-xs ${getDifficultyStyle(difficulty)} rounded-full`}>
          {formatDifficulty(difficulty)}
        </span>
      </div>
    </div>
  );
}
