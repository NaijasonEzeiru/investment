function HomeCard({
  children,
  heading,
  content,
}: Readonly<{
  children: React.ReactNode;
  heading: string;
  content: string;
}>) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      {children}
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{heading}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  );
}

export default HomeCard;
