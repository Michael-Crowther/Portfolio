"use client";
import { Button } from "../ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
// import { PrettyObject } from "../custom/PrettyObject";
import { Combobox } from "../custom/Combobox";
import { ArrowLeft } from "lucide-react";
import { Card } from "../ui/card";
import Image from "next/image";
import { useMemo, useState } from "react";
import { toast } from "sonner";
// import { PrettyObject } from "../custom/PrettyObject";

type CreateUserProps = {
  onBack: () => void;
  afterChanges: () => void;
};

export function CreateUser({ onBack, afterChanges }: CreateUserProps) {
  const protocol = window.location.protocol;
  const host = window.location.host;

  const [eyebrows, setEyebrows] = useState("");
  const [eyes, setEyes] = useState("");
  const [clothing, setClothing] = useState("");
  const [clothesColor, setClothesColor] = useState("");
  const [hatColor, setHatColor] = useState("");
  const [top, setTop] = useState("");
  const [skinColor, setSkinColor] = useState("");
  const [mouth, setMouth] = useState("");

  const { data: avatarOptions } = useQuery({
    queryKey: ["avatarOptions"],
    queryFn: async () => {
      const response = await fetch(`${protocol}//${host}/api/options`, {
        method: "GET",
      });

      return response.json();
    },
  });

  const { data: avatar } = useQuery({
    queryKey: [
      "avatar",
      clothing,
      clothesColor,
      skinColor,
      top,
      eyebrows,
      eyes,
      hatColor,
      mouth,
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        eyebrows,
        hatColor,
        skinColor,
        clothesColor,
        top,
        clothing,
        eyes,
        mouth,
      });

      const response = await fetch(
        `${protocol}//${host}/api/avatar?${params.toString()}`,
        { method: "GET" }
      );

      return response.json();
    },
  });

  const canSubmit = useMemo(
    () =>
      !!clothing ||
      !!clothesColor ||
      !!skinColor ||
      !!top ||
      !!eyebrows ||
      !!eyes ||
      !!hatColor ||
      !!mouth,
    [clothing, clothesColor, skinColor, top, eyebrows, eyes, hatColor, mouth]
  );

  const { mutate: createAvatar } = useMutation({
    mutationKey: ["createAvatar"],
    mutationFn: async (avatarData: {
      eyebrows: string;
      eyes: string;
      clothing: string;
      clothesColor: string;
      hatColor: string;
      top: string;
      skinColor: string;
      mouth: string;
    }) => {
      const params = new URLSearchParams(avatarData);
      const url = `${protocol}//${host}/api/avatar?${params.toString()}`;
      const response = await fetch(url, { method: "POST" });
      return response.json();
    },
    onSuccess: (data) => {
      onBack();
      afterChanges();
      toast(data.message);
    },
  });

  function clearSelections() {
    setEyebrows("");
    setEyes("");
    setClothing("");
    setClothesColor("");
    setHatColor("");
    setTop("");
    setSkinColor("");
    setMouth("");
  }

  return (
    <main className="flex gap-2 p-2 flex-col-reverse md:flex-row xl:flex-col-reverse 2xl:flex-row">
      <div className="min-h-[320px] p-5 pt-0 flex flex-col border border-primary/50 rounded-lg w-full lg:w-full md:w-2/3 2xl:w-2/3 shadow">
        <header className="flex items-center w-full pt-4">
          <Button
            className="cursor-pointer text-primary mb-4"
            variant={"ghost"}
            onClick={onBack}
          >
            <ArrowLeft />
            Back
          </Button>
          <span className="flex-1" />
          <Button
            className="cursor-pointer text-primary mb-4"
            onClick={clearSelections}
            variant="ghost"
            disabled={!canSubmit}
          >
            Clear All
          </Button>
          <Button
            className="dark:bg-teal-100/90 mb-4 shadow-sm cursor-pointer hover:bg-teal-500/40 bg-teal-500/50 text-primary dark:hover:bg-teal-100/80 dark:text-secondary justify-between"
            disabled={!canSubmit}
            onClick={() =>
              createAvatar({
                eyebrows,
                eyes,
                clothing,
                clothesColor,
                hatColor,
                top,
                skinColor,
                mouth,
              })
            }
          >
            Submit
          </Button>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 justify-center items-center h-full gap-4">
          {/* <PrettyObject>{avatarOptions}</PrettyObject> */}
          <Combobox
            options={avatarOptions?.options.skinColor.default}
            label="skin color"
            value={skinColor}
            onSelect={(value) => setSkinColor(value)}
          />
          <Combobox
            options={avatarOptions?.options.eyes.default}
            label="eyes"
            value={eyes}
            onSelect={(value) => setEyes(value)}
          />
          <Combobox
            options={avatarOptions?.options.eyebrows.default}
            label="eyebrows"
            value={eyebrows}
            onSelect={(value) => setEyebrows(value)}
          />
          <Combobox
            options={avatarOptions?.options.mouth.default}
            label="mouth"
            value={mouth}
            onSelect={(value) => setMouth(value)}
          />
          <Combobox
            options={avatarOptions?.options.clothing.default}
            label="clothing"
            value={clothing}
            onSelect={(value) => setClothing(value)}
          />
          <Combobox
            options={avatarOptions?.options.clothesColor.default}
            label="clothes color"
            value={clothesColor}
            onSelect={(value) => setClothesColor(value)}
          />
          <Combobox
            options={avatarOptions?.options.top.default}
            label="top"
            value={top}
            onSelect={(value) => setTop(value)}
          />
          <Combobox
            options={avatarOptions?.options.hatColor.default}
            label="top color"
            value={hatColor}
            onSelect={(value) => setHatColor(value)}
          />
        </section>
      </div>

      <Card className="dark:bg-slate-400/80 bg-inherit shadow border border-primary/50 py-0 rounded-md gap-2 w-full min-h-77 md:w-1/3 xl:w-full 2xl:w-1/3">
        <div className=" dark:bg-slate-300/50 bg-teal-300/30 px-3 h-full rounded-md rounded-b-none p-2 pb-0 flex justify-center min-h-77">
          {!!avatar?.svg && (
            <Image
              src={avatar.svg}
              alt="Avatar"
              width={300}
              height={300}
              className=" h-75"
            />
          )}
        </div>
      </Card>
    </main>
  );
}
