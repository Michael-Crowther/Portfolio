"use client";
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

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className="h-screen w-full flex">
      <span className="w-1/6 hidden 2xl:block" />
      <div className="w-full flex flex-col 2xl:flex-row 2xl:px-0">
        <section className="border border-pink-500 w-full h-full p-16 2xl:min-w-[600px] 2xl:w-1/3 flex flex-col">
          <div className="flex flex-col items-start">
            <p className="text-[48px] font-bold">Michael Crowther</p>
            <p className="text-[24px]">Full Stack Engineer</p>
          </div>
          <div className="flex justify-center mt-10">
            <Image
              src={imageUrl}
              alt="Profile Image"
              className="rounded-full w-80 h-80 object-cover shadow-lg"
            />
          </div>
          <p className="text-xl text-muted-foreground mt-10">
            I build accessible, reliable, and scalable systems for users all
            around the world.
          </p>
          <span className="flex-1" />

          <section className="flex items-center gap-4">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full"
              onClick={() => {
                window.open("https://github.com/Michael-Crowther", "_blank");
              }}
            >
              <Image
                src={theme === "dark" ? githubWhite : githubDark}
                alt="GitHub"
                className="h-8 w-8"
              />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="rounded-full"
              onClick={() => {
                window.open(
                  "https://www.linkedin.com/in/michael-crowther-385a6a239",
                  "_blank"
                );
              }}
            >
              <Image
                src={theme === "dark" ? linkedInWhite : linkedInDark}
                alt="LinkedIn"
                className="h-8 w-8"
              />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="rounded-full"
              onClick={() => {
                window.open(
                  "https://www.instagram.com/michael_d_crowther/",
                  "_blank"
                );
              }}
            >
              <Image
                src={theme === "dark" ? instagramWhite : instagramDark}
                alt="Instagram"
                className="h-8 w-8"
              />
            </Button>
            <span className="flex-1" />
            <ThemeSwitcher />
          </section>
        </section>

        <section className="border border-blue-500 2xl:min-w-[900px] h-full w-full 2xl:w-2/3 flex items-center justify-center">
          Section 2
        </section>
      </div>
      <span className="w-1/6 hidden 2xl:block" />
    </div>
  );
}
