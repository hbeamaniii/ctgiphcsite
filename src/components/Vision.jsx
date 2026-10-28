function Vision() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#5D87A1]">
          Welcome
        </p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
          Our Vision
        </h2>
        <p className="mt-6 text-base leading-8 text-slate-700">
          You are invited to experience Christ Temple, a beacon of light,
          faith, and service in the Greenburgh community and beyond. Rooted
          in a proud history and strengthened through seasons of change, we
          remain committed to preaching and teaching the Gospel of Jesus
          Christ, equipping the saints for ministry, and drawing souls into
          the Kingdom of God. With love, devotion, and the power of the Holy
          Ghost, we continue the work of God and the purpose He has given
          to this house.
        </p>
      </div>

      <div className="rounded-[2rem] bg-[#0A1826] p-8 text-white shadow-lg">
        <p className="text-sm uppercase tracking-[0.28em] text-white/65">
          Visit Us
        </p>
        <h3 className="mt-3 text-2xl font-semibold">
          Christ Temple GIPHC, Inc.
        </h3>

        <div className="mt-8 space-y-5 text-white/90">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/55">
              Address
            </p>
            <p className="mt-2 text-base">25 Oak St., White Plains, NY 10603</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/55">
              Service Times
            </p>
            <p className="mt-2 text-base">Sunday School · 10:00 AM</p>
            <p className="mt-1 text-base">Sunday Worship · 11:00 AM</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/55">
              Contact
            </p>
            <p className="mt-2 text-base">Office: 914-948-4596</p>
            <p className="mt-1 text-base">sectemple@christtemplegiphc.com</p>
          </div>
        </div>

        <a
          href="https://maps.google.com/?q=25+Oak+St+White+Plains+NY+10603"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-[#C8A96B] px-5 py-3 text-sm font-semibold text-[#0A1826] transition hover:brightness-105"
        >
          Get Directions
        </a>
      </div>
    </section>
  );
}

export default Vision;
