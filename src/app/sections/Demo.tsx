import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export function Demo() {
  return (
    <div className="min-h-screen xl:pt-10 pb-10 w-full" id="demo">
      <section
        className="sticky top-0 backdrop-blur-md py-8 px-6 sm:px-15 z-20 xl:hidden"
        style={{ paddingTop: `calc(env(safe-area-inset-top) + 2rem)` }}
      >
        <h1 className="uppercase font-bold text-lg tracking-widest block ">
          Demo
        </h1>
      </section>

      <section className=" p-6 sm:p-15 flex gap-6 flex-col">
        <p className="text-muted-foreground">
          Welcome to my Full Stack Application demo! Please start by entering a
          username to create your account. For demonstration purposes, your
          account will be created with the default password:{" "}
          <strong>&quot;1234&quot;</strong>.<br />
          <br />
          Passwords are securely hashed using industry-standard encryption
          before being stored in the database.
          <br />
          <br />
          All user input is securely saved and encrypted within a database
          hosted on Vercel.
        </p>
        <CreateUserCard />
      </section>
    </div>
  );
}

function CreateUserCard() {
  const [username, setUsername] = useState("");

  return (
    <Card className="w-[350px] bg-teal-400/10 border-teal-400/20 sm:min-w-[500px]">
      <CardHeader>
        <CardTitle className="text-primary">Create User</CardTitle>
        <CardDescription className="text-primary/70">
          Please provide a username.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <form>
          <div className="grid w-full items-center gap-4 text-primary">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Username"
                required
                className="dark:border-teal-400/30 border-black/30 shadow-sm"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="1234"
                disabled
                required
                className="dark:border-teal-400/30 border-black/30 shadow-sm"
              />
            </div>

            <Button
              type="submit"
              variant="outline"
              className="shadow-sm dark:bg-primary dark:hover:bg-primary dark:text-secondary w-full group"
            >
              Submit
              <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
