const ministryTeam = [
  { name: "MIT Natasha Haynes", image: "/images/natasha.jpg", title: "Minister in Training" },
  { name: "Elder Pete Lovell", image: "/images/pete.jpg", title: "Elder" },
  { name: "MIT Howard Beaman III", image: "/images/howard.jpg", title: "Minister in Training" },
  { name: "Minister Ransford Fraser", image: "/images/ransford.jpg", title: "Minister" },
];

function Leadership() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#5D87A1]">
        Our Leaders
      </p>
      <h1 className="mt-4 text-3xl font-semibold md:text-5xl">Leadership</h1>

      <section aria-labelledby="pastor-heading" className="mt-16">
        <article className="mx-auto max-w-4xl rounded-3xl bg-[#0A1826] p-8 shadow-lg text-white md:p-12">
          <img
            src="/images/carla.jpg"
            alt="Pastor Carla Brice-Talley"
            className="mx-auto h-48 w-48 rounded-full object-cover"
          />
          <div className="mt-6 text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-[#C8A96B]">
              Pastor
            </p>
            <h2 id="pastor-heading" className="mt-2 text-2xl font-semibold">
              Pastor Carla Brice-Talley
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-left text-sm leading-7 text-white/80">
              Pastor Carla Brice-Talley is a devoted woman of God, published author, gifted teacher of the Word, and inspiring leader. Born in Charlotte, North Carolina, she joined Christ Temple, GIPHC, in 2001 after graduate school and has served in several ministries, including Sunday School and the Praise Team. She also draws on her experience as a business executive with a Fortune 100 corporation to provide valuable counsel on church operations. Pastor Carla preached her initial sermon at Christ Temple in November 2013, following years of ministerial and leadership service at her home church in North Carolina. Committed to spiritual growth and biblical truth, she is excited to lead Christ Temple during this pivotal season and help guide the church toward its 100th anniversary. She believes the Church is a powerful institution uniquely positioned to transform lives and communities through the Gospel. She is married to Darren Talley, and they have three children: Darien Alexis, Brice Adam, and Zoe Catherine.
            </p>
          </div>
        </article>
      </section>

      <section aria-labelledby="ministry-team-heading" className="mt-16">
        <h2 id="ministry-team-heading" className="text-2xl font-semibold">
          Ministry Team
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ministryTeam.map((minister) => (
            <article key={minister.name} className="rounded-3xl bg-white p-6 text-center shadow-lg">
              <img
                src={minister.image}
                alt={minister.name}
                className="mx-auto h-24 w-24 rounded-full object-cover"
              />
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[#5D87A1]">
                {minister.title}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{minister.name}</h3>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Leadership;
