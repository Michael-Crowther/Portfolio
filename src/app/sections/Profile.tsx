import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import imageUrl from "../../../public/profile.jpg";
import { Button } from "@/components/ui/button";
import githubWhite from "../../../public/github-mark-white.svg";
import githubDark from "../../../public/github-mark.svg";
import linkedInDark from "../../../public/linkedInDark.svg";
import linkedInWhite from "../../../public/whiteLinkedIn.svg";
import instagramDark from "../../../public/instagramDark.svg";
import instagramWhite from "../../../public/instagramWhite.svg";
import ThemeSwitcher from "@/components/custom/ThemeSwitcher";
import { Download } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProfileSection() {
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

        <Navigation />

        <span className="flex-1" />

        <section className="flex items-center gap-2 mt-8">
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
              className="h-6 w-6"
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
              className="h-6 w-6"
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
              className="h-6 w-6"
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
                  <Download className="size-6" />
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

function Navigation() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href") || "";
    const targetId = href.replace("#", "");
    const el = document.getElementById(targetId);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const aTag = cn("group flex items-center py-3");
  const leftSpan = cn(
    "mr-4 h-px w-8  bg-slate-600 transition-all duration-300 group-hover:w-16  group-hover:bg-slate-200motion-reduce:transition-none"
  );
  const rightSpan = cn(
    "text-md font-bold uppercase tracking-widest  text-slate-500  group-hover:dark:text-slate-200 group-hover:text-slate-600"
  );

  return (
    <nav className="flex flex-col w-full mt-10">
      <ul className="space-y-2">
        <li>
          <a href="#about" className={aTag} onClick={handleScroll}>
            <span className={leftSpan} />
            <span className={rightSpan}>About</span>
          </a>
        </li>

        <li>
          <a href="#experience" className={aTag} onClick={handleScroll}>
            <span className={leftSpan} />
            <span className={rightSpan}>Experience</span>
          </a>
        </li>

        <li>
          <a href="#projects" className={aTag} onClick={handleScroll}>
            <span className={leftSpan} />
            <span className={rightSpan}>Projects</span>
          </a>
        </li>

        {/* Demo */}
        <li>
          <a href="#demo" className={aTag} onClick={handleScroll}>
            <span className={leftSpan} />
            <span className={rightSpan}>Demo</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
