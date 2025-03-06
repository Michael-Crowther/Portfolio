"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { ProfileSection } from "./sections/Profile";
import { About } from "./sections/About";
import { Experience } from "./sections/Experience";
import { Projects } from "./sections/Projects";
import { Demo } from "./sections/Demo";

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
    <div className="w-full flex xl:overflow-hidden overflow-x-hidden xl:min-h-screen">
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

      <div className="flex flex-col xl:flex-row xl:px-0 z-50 min-w-0 h-screen">
        <span className="w-1/6 hidden xl:block" />
        <ProfileSection />

        <section
          ref={contentSectionRef}
          className="h-full w-full flex xl:overflow-auto xl:max-h-screen"
        >
          <section className="xl:w-5/6 w-full ">
            <div className="w-full p-0 sm:pt-0">
              <About />
              <Experience />
              <Projects />
              <Demo />
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
