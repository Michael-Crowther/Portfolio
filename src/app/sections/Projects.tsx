import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import DevSpaceImg from "../../../public/dev-space.jpg";
import UnityImg from "../../../public/unity-engine-logo.jpg";
import CPUEmulatorImg from "../../../public/cpu-emulator.jpg";

export function Projects() {
  return (
    <div className="space-y-6 pt-20" id="projects">
      <ProjectCard
        img={DevSpaceImg}
        alt="Dev-Space"
        title="Dev Space - Discord Clone"
        description=" While still a work in progress, this project gave me foundational experience
                        with Next.js paradigms—including SSR and both client- and server-side components.
                        I also gained more familiarity with authentication, error-handling middleware,
                        and designing SQL tables and migrations. By paying close attention to Discord’s
                        frontend, I further improved my understanding of UI design and routing."
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
        description="Developed in Unity, this was my first large-scale programming project and the spark that fueled my passion for software development. Over three years, I created and published a first-person horror game on Steam—giving dozens of players a chance to experience my custom AI-driven monsters, movement systems, and progression mechanics in a world I designed from scratch. It was both deeply rewarding and an invaluable lesson in writing maintainable, scalable code."
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
        description="Serving as the capstone for my Computer Science degree, this project required building a CPU emulator in C++, an assembler in Python, and assembly code for a custom ISA. I also implemented various low-level CPU caches, providing a rigorous deep dive into computer architecture. Although it was the most challenging project I’ve undertaken, it offered me a profound understanding of how computers operate at their lowest level."
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
      className="flex flex-col-reverse 2xl:flex-row sm:p-4 hover:bg-card hover:cursor-pointer group rounded-lg gap-5 2xl:gap-10 items-center sm:items-start"
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
          <ArrowUpRight className="dark:group-hover:text-teal-300 size-4 transition-transform duration-200 ease-out group-hover:-translate-y-1 group-hover:translate-x-1" />
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
