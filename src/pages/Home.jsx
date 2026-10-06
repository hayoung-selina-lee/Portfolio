import ScrollHero from "../components/ScrollHero";

function Home() {
  return (
    <main className="bg-black">
      <ScrollHero />
      <header>HEADER</header>
      <section className="p-8 text-2xl text-red-500">SKILL</section>
      <section className="p-100 text-white">PROJECTS</section>
      <section className="p-100 text-white">CONTACT</section>
    </main>
  );
}

export default Home;
