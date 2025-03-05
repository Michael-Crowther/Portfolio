import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

export function Experience() {
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
