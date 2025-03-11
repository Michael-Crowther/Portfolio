import { CustomPagination } from "@/components/custom/CustomPagination";
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";
import { PrettyObject } from "@/components/custom/PrettyObject";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type User = {
  id: string;
  username: string;
  createdAt: Date;
  profileImageUrl: string;
};

export function Demo() {
  const [users, setUsers] = useState<User[]>();
  const [userCount, setUserCount] = useState(0);
  const [usersLoading, setUsersLoading] = useState(true);
  const [viewJson, setViewJson] = useState(false);
  const [limit] = useState(5);
  const [offset, setOffset] = useState(0);
  // const [hideCreate, setHideCreate] = useState(false);

  //fetch users
  const fetchUsers = useCallback(() => {
    setUsersLoading(true);
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

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
        <p className="text-primary/70">
          This is a basic social media demo to demonstrate my full stack
          abilities. You can view users and posts. Feel free to leave comments
          on posts. This backend is hosted on Vercel, with APIs configured with
          Node Express.
        </p>
        <Card className=" bg-teal-400/10 border-teal-400/20 shadow">
          <CardContent className="flex flex-col gap-4 h-full">
            <Tabs defaultValue="friends" className="w-full">
              <div className="flex items-center gap-8">
                <TabsList className="mb-5">
                  <TabsTrigger value="friends">Friends</TabsTrigger>
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
                value="friends"
                className={cn(
                  "overflow-y-hidden min-h-[310px]",
                  usersLoading && "items-center flex justify-center",
                  viewJson && "min-h-[580px]"
                )}
              >
                {usersLoading ? (
                  <LoadingSpinner />
                ) : viewJson ? (
                  <PrettyObject>{users}</PrettyObject>
                ) : (
                  <div className="flex h-full gap-2">
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

type UserCardProps = {
  user: User;
};

function UserCard({ user }: UserCardProps) {
  return (
    <Card className="dark:bg-slate-400/80 bg-inherit shadow">
      <CardContent className="font-bold">
        <Image
          src={user.profileImageUrl}
          alt="Avatar"
          width={300}
          height={300}
          className=" h-32"
        />
        <div className="pt-2 items-center gap-2 flex flex-col">
          <p>{user.username}</p>
          <div className="w-full pt-2 gap-2 flex flex-col">
            <Button className="dark:bg-teal-100/90 shadow-sm cursor-pointer hover:bg-teal-500/40 bg-teal-500/50 text-primary dark:hover:bg-teal-100/80 dark:text-secondary w-full">
              Message
            </Button>
            <Button className="bg-red-500/60 shadow dark:bg-red-400/90 dark:hover:bg-red-400/80 cursor-pointer text-primary hover:bg-red-500/50 dark:text-secondary">
              Remove Friend
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
