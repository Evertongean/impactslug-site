import { About } from "@/components/home/about";
import { Contact } from "@/components/home/contact";
import { Gallery } from "@/components/home/gallery";
import { Hero } from "@/components/home/hero";
import { Services } from "@/components/home/services";
import { SocialContent } from "@/components/home/social-content";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo-principal">
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main id="conteudo-principal">
        <Hero />
        <Services />
        <About />
        <Gallery />
        <SocialContent />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
