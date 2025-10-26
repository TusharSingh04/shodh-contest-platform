interface StatusBadgeProps {
  difficulty: string;
}

export default function StatusBadge({ difficulty }: StatusBadgeProps) {
  const getColorClass = () => {
    switch (difficulty.toUpperCase()) {
      case 'EASY':
        return 'bg-green-100 text-green-800';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800';
      case 'HARD':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getColorClass()}`}>
      {difficulty}
    </span>
  );
}
