function Leadership() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#5D87A1]">
        Our Leaders
      </p>
      <h1 className="mt-4 text-3xl font-semibold md:text-5xl">Leadership</h1>

      <div className="mt-16 grid gap-12 md:grid-cols-2">
        {/* Current Pastor */}
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <img
            src="/images/bishop.jpg"
            alt="Current Pastor"
            className="h-48 w-48 rounded-full object-cover mx-auto"
          />
          <div className="mt-6 text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-[#5D87A1]">
              Senior Pastor
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Bishop Wilbert G. Preston
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </div>
        </div>

        {/* Incoming Pastor */}
        <div className="rounded-3xl bg-[#0A1826] p-8 shadow-lg text-white">
          <img
            src="/images/carla.jpg"
            alt="Incoming Pastor"
            className="h-48 w-48 rounded-full object-cover mx-auto"
          />
          <div className="mt-6 text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-[#C8A96B]">
              Pastor Elect
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Elder Carla Brice-Talley
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </div>
        </div>
      </div>

      {/* Transition note */}
      <div className="mt-16 rounded-3xl bg-[#F5F1E8] p-8 text-center">
        <p className="text-sm uppercase tracking-[0.28em] text-[#5D87A1]">
          Pastoral Transition
        </p>
        <h3 className="mt-4 text-2xl font-semibold">A New Season</h3>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Details about
          the transition, installation service date, and anniversary celebration
          will be added here.
        </p>
      </div>
    </div>
  );
}

export default Leadership;
