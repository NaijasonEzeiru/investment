import { Star } from "lucide-react";

function TestimonialCard({
  children,
  name,
  position,
  content,
}: Readonly<{
  children: React.ReactNode;
  name: string;
  position: string;
  content: string;
}>) {
  return (
    <div className="bg-gray-50 p-8 rounded-xl">
      <div className="flex items-center mb-4">
        <Star className="w-5 h-5 text-yellow-400 fill-current" />
        <Star className="w-5 h-5 text-yellow-400 fill-current" />
        <Star className="w-5 h-5 text-yellow-400 fill-current" />
        <Star className="w-5 h-5 text-yellow-400 fill-current" />
        <Star className="w-5 h-5 text-yellow-400 fill-current" />
      </div>
      <p className="text-gray-600 mb-6">{content}</p>
      <div className="flex items-center">
        {children}
        <div>
          <div className="font-semibold text-gray-900">{name}</div>
          <div className="text-gray-600">{position}</div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
