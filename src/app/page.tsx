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
  const contentSectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
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
      if (contentSectionRef.current) {
        // Add the delta value to scrollTop for smooth scrolling
        contentSectionRef.current.scrollTop += e.deltaY;
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
        <ProfileSection />
        <ContentSection ref={contentSectionRef} />
      </div>
    </div>
  );
}

function ProfileSection() {
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

const ContentSection = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section
      ref={ref}
      className=" h-full w-full flex xl:overflow-auto max-h-screen"
    >
      <section className="xl:w-5/6 w-full">
        <div className="w-full  p-20">
          <About />
        </div>
      </section>
    </section>
  );
});

ContentSection.displayName = "ContentSection";

function About() {
  return (
    <div>
      <p className="text-muted-foreground">
        I&apos;m a developer specializing in creating accessible, scalable, and
        robust software through thoughtfully designed user interfaces and
        well-tested APIs and backend systems. My passion lies at the
        intersection of design and functionality, crafting experiences that not
        only look great but also perform reliably at scale.
      </p>

      <br />

      <p className="text-muted-foreground">
        Currently, I am a Full-Stack Engineer at{" "}
        <a
          className="text-primary hover:text-blue-300"
          href="https://www.wysslingconsulting.com/"
          target="_blank"
        >
          Wyssling Consulting
        </a>
        , where I focus on automating workflows and maintaining both internal
        and external APIs. My responsibilities include delivering clean frontend
        designs, managing state, and building reusable React components—all
        while writing efficient SQL queries and CRUD operations. I also have
        experience with authentication, authorization, encryption, and other key
        security considerations on the web.
      </p>

      <br />

      <p className="text-muted-foreground">
        I hold a Computer Science degree from{" "}
        <a
          className="text-primary hover:text-blue-300"
          target="_blank"
          href="https://www.uvu.edu/cs/"
        >
          Utah Valley University
        </a>
        , with a background in networking, AI, security, data structures,
        algorithms, operating systems, and low-level computer architecture. As a
        student, I was driven by my love for programming, science, and
        mathematics, and that passion still fuels my drive to build software
        that can make a meaningful impact.
      </p>

      <br />

      <p className="text-muted-foreground">
        In my spare time, I enjoy hiking, camping, discovering new music, and
        exploring the next must-play game on my PC or PlayStation.
      </p>
    </div>
  );
}
