import { CustomPagination } from "@/components/custom/CustomPagination";
import { PrettyObject } from "@/components/custom/PrettyObject";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";

type User = {
  id: string;
  username: string;
  createdAt: Date;
};

export function Demo() {
  const [users, setUsers] = useState<User[]>();
  const [userCount, setUserCount] = useState(0);
  const [usersLoading, setUsersLoading] = useState(true);
  const [viewJson, setViewJson] = useState(false);
  const [limit] = useState(5);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetch(`/api/users?limit=${limit}&offset=${offset}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setUserCount(data.userCount);
        setUsersLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setUsersLoading(false);
      });
  }, [limit, offset]);

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
        </p>
        <CreateUserCard />
      </section>

      <section className=" p-6 sm:p-15 flex gap-6 flex-col">
        <p className="text-primary/70">
          This is a basic social media demo to demonstrate my full stack
          abilities. You can view users and posts. Feel free to leave comments
          on posts. This backend is hosted on Vercel, with APIs configured with
          Node Express.
        </p>
        <Card className=" h-[560px] bg-teal-400/10 border-teal-400/20 shadow">
          <CardContent className="flex flex-col gap-4 h-full">
            <Tabs defaultValue="users" className="w-full max-h-[460px]">
              <div className="flex items-center gap-8">
                <TabsList className="mb-5">
                  <TabsTrigger value="users">Users</TabsTrigger>
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                </TabsList>
                <div className="flex items-center space-x-2 pb-4 text-primary">
                  <Switch
                    id="json"
                    checked={viewJson}
                    onCheckedChange={setViewJson}
                  />
                  <Label htmlFor="json">View JSON</Label>
                </div>
              </div>
              <TabsContent
                value="users"
                className={cn(
                  usersLoading && "items-center flex justify-center",
                  "overflow-hidden min-h-[400px] "
                )}
              >
                {usersLoading ? (
                  <DotLoader color={"teal"} />
                ) : viewJson ? (
                  <PrettyObject>{users}</PrettyObject>
                ) : (
                  <div className="flex flex-col gap-2">
                    {users?.map((user) => (
                      <UserCard user={user} key={user.id} />
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="posts">Posts data here</TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <CustomPagination
              limit={limit}
              label="Users"
              offset={offset}
              count={userCount || 0}
              setOffset={setOffset}
            />
          </CardFooter>
        </Card>
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
              className="dark:bg-teal-100/90 shadow-sm dark:hover:bg-teal-100 dark:text-secondary w-full group"
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

type UserCardProps = {
  user: User;
};

function UserCard({ user }: UserCardProps) {
  return (
    <Card className="dark:bg-teal-100/90 bg-inherit shadow py-[10px]">
      <CardContent className="">
        <p>{user.username}</p>
        <p>{`Created ${format(new Date(user.createdAt), "PPPpp")}`}</p>
      </CardContent>
    </Card>
  );
}
