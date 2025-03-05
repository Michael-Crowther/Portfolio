"use client";
import { useEffect, useRef, forwardRef } from "react";
import Image, { StaticImageData } from "next/image";
import imageUrl from "../../public/profile.jpg";
import { Button } from "@/components/ui/button";
import githubWhite from "../../public/github-mark-white.svg";
import githubDark from "../../public/github-mark.svg";
import linkedInDark from "../../public/linkedInDark.svg";
import linkedInWhite from "../../public/whiteLinkedIn.svg";
import instagramDark from "../../public/instagramDark.svg";
import instagramWhite from "../../public/instagramWhite.svg";
import { useTheme } from "next-themes";
import { useState } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import DevSpaceImg from "../../public/dev-space.jpg";
import UnityImg from "../../public/unity-engine-logo.jpg";
import CPUEmulatorImg from "../../public/cpu-emulator.jpg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import ThemeSwitcher from "@/components/custom/ThemeSwitcher";

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
    <div className="  w-full flex overflow-x-hidden">
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
          className="absolute pointer-events-none hidden sm:block"
        />
      )}

      <div className="flex flex-col xl:flex-row xl:px-0 z-50 min-w-0">
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
    <section className="relative w-full p-16 xl:min-w-[460px] xl:max-w-[100px] xl:w-1/3 flex flex-col">
      <div className="flex flex-col items-start">
        <p className="text-[29px] sm:text-[40px] font-bold">Michael Crowther</p>
        <p className="text-[18px] sm:text-[22px]">Full Stack Engineer</p>
      </div>

      {/* Absolutely positioned effect when on mobile screen */}
      {resolvedTheme === "dark" && (
        <div
          style={{
            width: "1000px",
            height: "1000px",
            background:
              "radial-gradient(circle, rgba(0, 0, 128, 0.3) 0%, rgba(0, 0, 128, 0) 60%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          className="absolute pointer-events-none block sm:hidden z-[-1]"
        />
      )}

      <div className="flex flex-col items-center sm:items-start xl:items-center xl:justify-center h-full mt-10">
        <Image
          src={imageUrl}
          alt="Profile Image"
          className="rounded-full sm:w-70 sm:h-70 w-60 h-60 object-cover shadow-lg"
        />
        <p className="text-xl text-muted-foreground mt-10">
          I build accessible, reliable, and scalable systems for users all
          around the world.
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
              //className="h-8 w-8"
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
              //className="h-8 w-8"
            />
          </Button>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full"
                  onClick={() => {
                    window.open("/resume.pdf", "_blank");
                  }}
                >
                  <Download className="size-8" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Download Resumé</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <ThemeSwitcher />
        </section>
      </div>
    </section>
  );
}

const ContentSection = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section
      ref={ref}
      className=" h-full w-full flex overflow-none xl:overflow-auto xl:max-h-screen"
    >
      <section className="xl:w-5/6 w-full">
        <div className="w-full p-8 sm:p-20">
          <About />
          <Experience />
          <Projects />
        </div>
      </section>
    </section>
  );
});

ContentSection.displayName = "ContentSection";

function About() {
  return (
    <div className="mb-20">
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

function Experience() {
  return (
    <div className="space-y-15 mb-20">
      <ExperienceCard
        date="OCTOBER 2023 - PRESENT"
        title="Full Stack Software Engineer • Wyssling Consulting"
        description="Developed a React, Node, and PostgreSQL CRM platform with a three-person team to manage solar projects for over 300 clients. This new system replaced an $8,000/month RDP server, significantly improving productivity, accuracy, and client satisfaction. I also created a suite of APIs to automate project submissions, drastically reducing turnaround times. Collaboration involved regular code reviews, frequent discussions on scalable design patterns, and organized feature planning. Finally, I set up automated deployments on AWS using GitHub, Elastic Beanstalk, EC2, and CodePipeline."
        tags={[
          "JavaScript",
          "TypeScript",
          "React",
          "Tailwind CSS",
          "tRPC",
          "Node.js",
          "PostgreSQL",
          "AWS",
          "Drizzle",
          "Prisma",
          "Express.js",
          "Swagger UI",
        ]}
        href="https://www.wysslingconsulting.com/"
      />

      <ExperienceCard
        date="SEPTEMBER 2018 - MAY 2025"
        title="Computer Science Student • Utah Valley University"
        description="Studying Computer Science provided me with a strong foundation in both theoretical and practical applications of technology. Over my five years in college, I collaborated with diverse software engineering teams, honing both leadership and technical skills. This rigorous program shaped me into a driven problem solver and sparked my passion for turning real-world ideas into polished, impactful products."
        tags={[
          "C++",
          "Python",
          "OOP",
          "AI",
          "Software Engineering",
          "Data Structures",
          "Algorithms",
          "Data Privacy",
          "Databases",
          "Web Programming",
          "Operating Systems",
        ]}
        href="https://www.uvu.edu/cs/"
      />
      <a
        href="/resume.pdf"
        target="_blank"
        className="flex 2xl:flex-row sm:p-4 hover:cursor-pointer group rounded-lg gap-2 items-center"
      >
        <p className="dark:group-hover:text-teal-300">View full Full Resumé</p>
        <ArrowUpRight className="dark:group-hover:text-teal-300 size-4 transition-transform duration-200 ease-out group-hover:-translate-y-1 group-hover:translate-x-1" />
      </a>
    </div>
  );
}

type ExperienceCardProps = {
  date: string;
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  href?: string;
};

function ExperienceCard(props: ExperienceCardProps) {
  const { date, title, subtitle, description, tags, href } = props;

  return (
    <a
      className="flex flex-col 2xl:flex-row sm:p-4 hover:bg-card hover:cursor-pointer group rounded-lg"
      href={href}
      target="_blank"
    >
      <section className="min-w-[230px] mb-3">
        <p className="text-muted-foreground text-[12px]">{date}</p>
      </section>

      <section className="w-full flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <p className="text-[18px] dark:group-hover:text-teal-300">{title}</p>
          <ArrowUpRight className="dark:group-hover:text-teal-300 size-6 transition-transform duration-200 ease-out group-hover:-translate-y-1 group-hover:translate-x-1" />
        </div>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        <p className="text-muted-foreground">{description}</p>
        <ul className="flex gap-1 mt-2 flex-wrap">
          {tags.map((tag: string) => (
            <Badge
              key={tag}
              className="dark:bg-teal-400/10 rounded-full bg-teal-300/40 leading-5 px-3 py-1 dark:text-teal-300 text-black"
            >
              {tag}
            </Badge>
          ))}
        </ul>
      </section>
    </a>
  );
}

function Projects() {
  return (
    <div className="space-y-6">
      <ProjectCard
        img={DevSpaceImg}
        alt="Dev-Space"
        title="Dev Space - Discord Clone"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores accusantium at dolore maiores maxime nesciunt ducimus pariatur? Officia, accusantium inventore?"
        tags={[
          "React",
          "Tailwind CSS",
          "Next.js",
          "SQLite",
          "Turso",
          "tRPC",
          "NextAuth.js",
        ]}
        href="https://www.dev--space.com"
      />
      <ProjectCard
        img={UnityImg}
        alt="Gone"
        title="Gone - Published Unity Project"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores accusantium at dolore maiores maxime nesciunt ducimus pariatur? Officia, accusantium inventore?"
        tags={[
          "Unity",
          "C#",
          "Animation",
          "AI",
          "Sound Design",
          "Player Progression",
          "Weapon Functionality",
        ]}
        href="https://store.steampowered.com/app/1984630/Gone/"
      />
      <ProjectCard
        img={CPUEmulatorImg}
        alt="CPU Emulator"
        title="CPU Emulator & Assembler"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores accusantium at dolore maiores maxime nesciunt ducimus pariatur? Officia, accusantium inventore?"
        tags={[
          "C++",
          "Python",
          "Memory Management",
          "Assembler",
          "Assembly",
          "Cache",
        ]}
        href="https://github.com/Michael-Crowther/CPU-Emulator-Assembler"
      />
    </div>
  );
}

type ProjectCardProps = {
  img: StaticImageData;
  alt: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
};

function ProjectCard(props: ProjectCardProps) {
  const { img, title, description, tags, href, alt } = props;

  return (
    <a
      className="flex flex-col-reverse 2xl:flex-row sm:p-4 hover:bg-card hover:cursor-pointer group rounded-lg gap-5 2xl:gap-10"
      href={href}
      target="_blank"
    >
      <div>
        <Image
          src={img}
          alt={alt}
          loading="lazy"
          width="300"
          height="48"
          decoding="async"
          className="aspect-video object-cover rounded-lg border-2 border-slate-200/10"
        />
      </div>

      <section className="w-full flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <p className="text-[18px] dark:group-hover:text-teal-300">{title}</p>
          <ArrowUpRight className="dark:group-hover:text-teal-300 size-6 transition-transform duration-200 ease-out group-hover:-translate-y-1 group-hover:translate-x-1" />
        </div>
        <p className="text-muted-foreground">{description}</p>
        <ul className="flex gap-1 mt-2 flex-wrap">
          {tags.map((tag: string) => (
            <Badge
              key={tag}
              className="dark:bg-teal-400/10 rounded-full bg-teal-300/40 leading-5 px-3 py-1 dark:text-teal-300 text-black"
            >
              {tag}
            </Badge>
          ))}
        </ul>
      </section>
    </a>
  );
}
