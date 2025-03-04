"use client";
import { useEffect, useRef, forwardRef } from "react";
import Image from "next/image";
import imageUrl from "../../public/profile.jpg";
import ThemeSwitcher from "@/components/utils/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import githubWhite from "../../public/github-mark-white.svg";
import githubDark from "../../public/github-mark.svg";
import linkedInDark from "../../public/linkedInDark.svg";
import linkedInWhite from "../../public/whiteLinkedIn.svg";
import instagramDark from "../../public/instagramDark.svg";
import instagramWhite from "../../public/instagramWhite.svg";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function Home() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const rightSectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Listen for wheel events on the window
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (rightSectionRef.current) {
        // Add the delta value to scrollTop for smooth scrolling
        rightSectionRef.current.scrollTop += e.deltaY;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-screen w-full bg-background" />;
  }

  return (
    <div className="relative h-screen w-full flex">
      {/* Dynamic background effect that follows the mouse */}
      {resolvedTheme === "dark" && (
        <div
          style={{
            left: mousePos.x,
            top: mousePos.y,
            width: "1000px",
            height: "1000px",
            background:
              "radial-gradient(circle, rgba(0, 0, 128, 0.3) 0%, rgba(0, 0, 128, 0) 60%)",
            transform: "translate(-50%, -50%)",
          }}
          className="absolute pointer-events-none"
        />
      )}

      <div className="flex flex-col xl:flex-row xl:px-0 z-50">
        <span className="w-1/6 hidden xl:block" />
        <LeftSection />
        <RightSection ref={rightSectionRef} />
      </div>
    </div>
  );
}

function LeftSection() {
  const { resolvedTheme } = useTheme();

  return (
    <section className=" w-full p-16 xl:min-w-[460px] xl:max-w-[100px] xl:w-1/3 flex flex-col">
      <div className="flex flex-col items-start">
        <p className="text-[40px] font-bold">Michael Crowther</p>
        <p className="text-[22px]">Full Stack Engineer</p>
      </div>
      <div className="flex xl:justify-center mt-10">
        <Image
          src={imageUrl}
          alt="Profile Image"
          className="rounded-full w-80 h-80 object-cover shadow-lg"
        />
      </div>
      <p className="text-xl text-muted-foreground mt-10">
        I build accessible, reliable, and scalable systems for users all around
        the world.
      </p>
      <span className="flex-1" />
      <section className="flex items-center gap-4 mt-8">
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full"
          onClick={() =>
            window.open("https://github.com/Michael-Crowther", "_blank")
          }
        >
          <Image
            src={resolvedTheme === "dark" ? githubWhite : githubDark}
            alt="GitHub"
            className="h-8 w-8"
          />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full"
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/michael-crowther-385a6a239",
              "_blank"
            )
          }
        >
          <Image
            src={resolvedTheme === "dark" ? linkedInWhite : linkedInDark}
            alt="LinkedIn"
            className="h-8 w-8"
          />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full"
          onClick={() =>
            window.open(
              "https://www.instagram.com/michael_d_crowther/",
              "_blank"
            )
          }
        >
          <Image
            src={resolvedTheme === "dark" ? instagramWhite : instagramDark}
            alt="Instagram"
            className="h-8 w-8"
          />
        </Button>
        <ThemeSwitcher />
      </section>
    </section>
  );
}

const RightSection = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section
      ref={ref}
      className=" h-full w-full flex xl:overflow-auto max-h-screen"
    >
      <section className="xl:w-5/6 w-full">
        <div className="w-full  p-20">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque maiores
          consequuntur a illo sequi necessitatibus aliquam veritatis corrupti
          sunt eum iusto inventore, officiis quo unde tempora voluptas? Odio
          quis pariatur rerum ab sequi? Nostrum, sint inventore. Veritatis id
          cum nulla hic eius dignissimos sed deserunt perspiciatis labore
          corrupti architecto, cupiditate eum, quisquam molestias numquam at.
          Itaque eaque soluta possimus labore, corporis aspernatur ratione animi
          exercitationem dolorum quo, earum sit impedit maxime ipsum dolor!
          Harum vitae incidunt deserunt, quasi nihil delectus impedit porro!
          Eius, eum nostrum? Qui adipisci ipsa sapiente? Eveniet maxime eaque
          quidem dolorum, ab veritatis reprehenderit dolorem aliquid molestiae
          enim perspiciatis est a sit consequatur facilis, nemo fugit, assumenda
          architecto voluptatem expedita at vero cum natus temporibus. Amet
          explicabo quidem eum sit quos, a iste minima perferendis vitae officia
          quae facilis alias quasi ad, minus consequatur consequuntur ipsa
          magnam maxime! Quos temporibus illum aut, enim unde placeat?
          Recusandae eligendi autem commodi laboriosam minus? Itaque,
          voluptatibus? Debitis excepturi recusandae ab, porro consectetur quos
          sapiente nisi deserunt eaque perferendis tempore nemo voluptates
          aspernatur itaque illo amet a molestiae molestias natus quae? Aliquid,
          doloremque? Optio, et fuga mollitia libero exercitationem aspernatur
          aliquam quod ipsum inventore suscipit harum! Accusamus, nisi. Quod
          maiores voluptas iste possimus dolore, recusandae eligendi debitis
          autem accusamus inventore non, molestiae at voluptatum suscipit
          dolores cum temporibus modi neque minima? At aperiam ipsam ipsa
          voluptate magnam voluptatum eveniet nulla ratione quas soluta iste eos
          vel nostrum recusandae est, doloremque architecto quo nisi autem
          provident? Suscipit nam vel ducimus modi consequatur, id quod? Iste,
          quibusdam, alias inventore voluptates dicta rerum dignissimos, harum
          corporis laudantium sed ad veniam. Est mollitia, minus tenetur iste
          officiis quae qui accusamus aut consectetur odit magni recusandae
          molestias ratione reprehenderit quisquam itaque placeat aspernatur,
          inventore autem dolores magnam possimus. Minima a quod velit sunt
          delectus doloribus iste illo vitae repudiandae quaerat, tempora, eum
          ut. Cum odio aliquam ullam fugit ipsum beatae veritatis non cupiditate
          sed doloribus repellat temporibus, laboriosam itaque vel officiis quod
          consequatur ea a sunt exercitationem vitae similique voluptate. Eos
          deleniti dignissimos commodi cum quidem quos, exercitationem
          blanditiis iure soluta rem sunt accusantium asperiores cumque
          inventore enim, hic ad quasi ipsam nulla at? Beatae quae, vitae ex
          mollitia reprehenderit deleniti, pariatur alias aliquam debitis totam
          est inventore cupiditate consequuntur dolorum voluptates corrupti sint
          autem dolor magnam? Labore necessitatibus obcaecati consequatur quo
          architecto iure impedit autem numquam? Ab natus quisquam vero nulla
          alias officia fuga, iure libero quae ut aut molestias illum aliquid.
          Ea cumque modi totam aut explicabo at dicta vero natus nostrum
          blanditiis quia dolores consequuntur, quasi fugit nam maxime illo,
          fuga eum voluptatibus in culpa maiores. Vero aliquam consectetur dolor
          aliquid impedit reprehenderit cupiditate totam. Laborum aut asperiores
          assumenda tempore minus. Unde, sunt cum ullam voluptatem perspiciatis
          inventore deserunt quos cumque! Excepturi nihil recusandae dolorum
          modi? At illum, eius fugit soluta corporis ratione, fuga nostrum
          inventore hic sit a dolorum. Ullam voluptatibus facilis doloribus,
          dolor dicta magnam, error commodi vero optio repellat recusandae, quae
          voluptate! Molestiae sequi nobis repudiandae, autem voluptatem
          eligendi esse corporis illo sit neque dolorem, tempore magni,
          reiciendis beatae soluta ducimus doloribus ut voluptatibus aperiam! Ut
          illum quod numquam fugiat incidunt rerum? Aliquid at eaque ratione
          molestias ut autem ex! Ducimus deleniti veritatis assumenda eligendi
          voluptatum id laborum fugiat non perspiciatis similique, quo hic
          voluptatem numquam eos dolores! Nemo ea, quaerat, commodi hic quo quod
          quos asperiores dolorem porro iusto officiis praesentium dolores
          labore dicta, deleniti tempore optio reiciendis quasi repellat!
          Deserunt sequi sed dolorem mollitia expedita aliquid vero corrupti
          voluptatibus fugit pariatur. Odit asperiores dolorum fuga iste quaerat
          harum in illo cum corrupti! Nobis distinctio vitae beatae quam
          doloribus eos aperiam odit qui ea aspernatur officia suscipit
          similique harum, deleniti fugiat illum fuga laborum iste repellendus
          obcaecati, optio eligendi repudiandae rem! Adipisci veniam quidem
          laudantium exercitationem ducimus impedit itaque minima totam commodi
          dolor, iste temporibus incidunt voluptates reprehenderit soluta, atque
          debitis ex. Officiis fuga reprehenderit alias atque sint, maiores
          necessitatibus neque possimus, placeat quam soluta! Enim magni
          incidunt cum consequuntur distinctio quidem dolor quis cupiditate vel
          facere harum eligendi quisquam, accusamus porro officiis nulla
          voluptatem, quae deleniti soluta magnam asperiores reprehenderit at
          velit. Id tempore rerum perferendis consequuntur delectus tempora unde
          harum! Unde tenetur illum autem repudiandae rerum atque eos, ipsa
          laboriosam deleniti, facilis vero dolor est voluptate fugiat. Commodi
          harum voluptatibus facere. Aliquid dolore id saepe quaerat placeat
          odio nisi odit perspiciatis maxime cupiditate unde obcaecati at esse
          debitis quae iusto, incidunt quibusdam tempora ut praesentium atque!
          Velit amet eaque laborum, nihil quasi alias porro inventore dolorem
          cupiditate labore fugiat rerum cumque earum saepe ut provident fugit
          aliquam quam deserunt ipsam ea architecto odit. Libero laboriosam
          error obcaecati dolores necessitatibus rem assumenda dolorem maxime
          consequatur aliquam maiores quae culpa iusto, in voluptates? Libero
          facilis molestiae et ea totam quam qui ab dolorum quidem obcaecati
          asperiores voluptate harum neque atque iusto eius beatae recusandae
          numquam illo nobis itaque soluta, assumenda dicta corrupti. Labore
          molestiae asperiores voluptas optio quidem expedita excepturi nobis
          harum officiis consectetur eveniet non a sint ab consequatur, tenetur
          nulla perferendis tempore est porro eos? Quasi possimus excepturi
          assumenda, ducimus necessitatibus eum veniam voluptatibus aperiam
          quisquam saepe non explicabo reiciendis quaerat vitae ea eius
          voluptates expedita nesciunt dicta! Ex eligendi est doloremque
          provident ducimus facere consequuntur animi quod vitae, mollitia ut
          repellendus sapiente iusto inventore corporis reprehenderit fugit at
          sunt quas. Quae, corporis. Dicta laborum aut assumenda minima commodi
          veritatis ipsum expedita impedit dolorem ducimus, necessitatibus
          quibusdam alias amet cum doloremque iste, aspernatur doloribus nostrum
          in. Officiis dolor consequuntur molestiae blanditiis ut voluptatem
          voluptas dignissimos quae consectetur ipsam dolorem illum debitis,
          deserunt ab praesentium iure eum. Sapiente deserunt natus perferendis
          beatae pariatur. Saepe sapiente, quo vel harum suscipit aliquam maxime
          blanditiis omnis? Ratione magnam esse numquam? Eum consequuntur
          distinctio corrupti architecto laudantium, omnis amet facilis tenetur
          excepturi quod esse obcaecati asperiores suscipit et consequatur
          dolor, hic iste sit numquam? Nemo eligendi dicta et laboriosam
          nesciunt omnis nam voluptate deleniti unde voluptatibus, fugiat minus
          perspiciatis qui, neque quibusdam sit repudiandae aliquam porro alias
          error. Animi dignissimos a rerum!
        </div>
      </section>
    </section>
  );
});

RightSection.displayName = "RightSection";
