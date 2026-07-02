function Visit() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#5D87A1]">
        Come Worship With Us
      </p>
      <h1 className="mt-4 text-3xl font-semibold md:text-5xl">Visit</h1>

      <div className="mt-16 grid gap-12 md:grid-cols-2 md:items-start">
        {/* Info card */}
        <div className="rounded-[2rem] bg-[#0A1826] p-8 text-white shadow-lg">
          <p className="text-xs uppercase tracking-[0.24em] text-white/55">
            Address
          </p>
          <p className="mt-2 text-base">25 Oak St., White Plains, NY 10603</p>

          <div className="mt-6">
            <p className="text-xs uppercase tracking-[0.24em] text-white/55">
              Service Times
            </p>
            <p className="mt-2 text-base">Sunday School · 10:00 AM</p>
            <p className="mt-1 text-base">Sunday Worship · 11:00 AM</p>
          </div>

          <div className="mt-6">
            <p className="text-xs uppercase tracking-[0.24em] text-white/55">
              Contact
            </p>
            <p className="mt-2 text-base">Office: 914-948-4596</p>
            <p className="mt-1 text-base">sectemple@christtemplegiphc.com</p>
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

        {/* Map placeholder */}

        <a
          href="https://maps.google.com/?q=25+Oak+St,White+Plains,NY+10603"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-[2rem] bg-[#D5E4F2] shadow-lg min-h-[400px] text-[#0A1826] font-semibold hover:bg-[#5D87A1] hover:text-white transition"
        >
          View on Google Maps →
        </a>
      </div>
    </div>
  );
}

export default Visit;
