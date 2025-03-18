"use client";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
// import { PrettyObject } from "../custom/PrettyObject";
import { Combobox } from "../custom/Combobox";
import { ArrowLeft } from "lucide-react";
import { Card } from "../ui/card";
import Image from "next/image";

export function CreateUser({ onBack }: { onBack: () => void }) {
  const protocol = window.location.protocol;
  const host = window.location.host;

  async function fetchAvatarOptions() {
    const response = await fetch(`${protocol}//${host}/api/avatars`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }

  const { data: avatarOptions } = useQuery({
    queryKey: ["avatarOptions"],
    queryFn: fetchAvatarOptions,
  });

  return (
    <main className="flex gap-2 p-2">
      <div className="min-h-[300px] p-5 pt-0 flex flex-col border border-primary/50 rounded-lg w-full lg:w-full md:w-2/3 2xl:w-2/3 shadow">
        <header className="flex items-center w-full pt-4">
          <Button
            className="cursor-pointer text-primary mb-4"
            variant={"ghost"}
            onClick={onBack}
          >
            <ArrowLeft />
            Back
          </Button>
        </header>

        <section className="grid grid-cols-2 justify-center items-center h-full gap-4">
          <Combobox
            options={avatarOptions?.options.earrings.default}
            label="earrings"
          />
          <Combobox
            options={avatarOptions?.options.eyebrows.default}
            label="eyebrows"
          />
          <Combobox
            options={avatarOptions?.options.eyes.default}
            label="eyes"
          />
          <Combobox
            options={avatarOptions?.options.facialHair.default}
            label="facial hair"
          />
          <Combobox
            options={avatarOptions?.options.glasses.default}
            label="glasses"
          />
          <Combobox
            options={avatarOptions?.options.hair.default}
            label="hair"
          />
          <Combobox
            options={avatarOptions?.options.mouth.default}
            label="mouth"
          />
          <Combobox
            options={avatarOptions?.options.nose.default}
            label="nose"
          />
          <Combobox
            options={avatarOptions?.options.shirt.default}
            label="shirt"
          />
        </section>
      </div>

      <Card className="dark:bg-slate-400/80 bg-inherit shadow border border-primary/50 py-0 rounded-md gap-2 w-1/3 hidden md:block lg:hidden 2xl:block">
        <div className=" dark:bg-slate-300/50 bg-teal-300/30 px-3 rounded-md rounded-b-none p-2 pb-0 flex justify-center">
          <Image
            src={""}
            alt="Avatar"
            width={300}
            height={300}
            className=" h-56"
          />
        </div>
        <div className="p-4 pt-3 items-center gap-2 flex flex-col">
          <p className="font-semibold text-xl">Fake Username</p>
        </div>
      </Card>
    </main>
  );
}
