import LinkClient from "./link-client";

function Hero({
  title,
  desc,
  started,
  completed,
  users,
  rated,
  listed,
}: {
  title: string;
  desc: string;
  started: string;
  completed: string;
  users: string;
  rated: string;
  listed: string;
}) {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-900 text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80')] mix-blend-overlay opacity-20 bg-cover bg-center"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl text-blue-100 mb-12">{desc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <LinkClient started={started} />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">10,000+</div>
            <div className="text-blue-200">{completed}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">5,000+</div>
            <div className="text-blue-200">{rated}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">25,000+</div>
            <div className="text-blue-200">{users}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">15,000+</div>
            <div className="text-blue-200">{listed}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
