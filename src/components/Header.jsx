function Header() {
  return (
    <header className="relative isolate overflow-hidden">
      <img
        src="/images/IMG_2295.JPEG"
        alt="Christ Temple church building"
        className="h-[64vh] min-h-[460px] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1826]/75 via-[#0A1826]/45 to-[#0A1826]/80" />

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="max-w-4xl text-center text-white">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#D5E4F2] md:text-base">
            Christ Temple GIPHC, Inc.
          </p>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            Building Tomorrow With Steps Today
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/90 md:text-lg">
            Equipping all people through the teaching of God's Word with the
            spiritual steps necessary to become eternal kingdom citizens.
          </p>


        </div>
      </div>
    </header>
  );
}

export default Header;
