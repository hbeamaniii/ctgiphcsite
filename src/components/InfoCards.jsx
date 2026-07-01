function InfoCards() {
  return (
    <section className="relative z-10 mx-auto -mt-16 max-w-6xl px-6">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-7 shadow-lg">
          <div className="mb-4 h-1.5 w-12 rounded-full bg-[#5D87A1]"></div>
          <h2 className="text-xl font-semibold">Watch</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            View sermons, worship services, and special events on our YouTube
            channel.
          </p>
        </div>
        <div className="rounded-3xl bg-white p-7 shadow-lg">
          <div className="mb-4 h-1.5 w-12 rounded-full bg-[#C8A96B]"></div>
          <h2 className="text-xl font-semibold">Connect</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Stay updated through Facebook and Instagram for announcements and
            church life.
          </p>
        </div>
        <div className="rounded-3xl bg-white p-7 shadow-lg">
          <div className="mb-4 h-1.5 w-12 rounded-full bg-[#D5E4F2]"></div>
          <h2 className="text-xl font-semibold">Visit</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Find our location, service time, and a warm invitation to worship
            with us in person.
          </p>
        </div>
      </div>
    </section>
  );
}

export default InfoCards;
