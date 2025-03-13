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
import { Dispatch, SetStateAction, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NoResults } from "@/components/custom/NoResults";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";

type UserData = {
  users: {
    id: string;
    username: string;
    createdAt: Date;
    profileImageUrl: string;
  }[];
  userCount: number;
};

export function Demo() {
  const [viewJson, setViewJson] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState("");
  const [limit] = useState(5);
  const [offset, setOffset] = useState(0);

  const protocol = window.location.protocol;
  const host = window.location.host;

  async function fetchUsers() {
    const response = await fetch(
      `${protocol}//${host}/api/users?limit=${limit}&offset=${offset}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }

  async function removeUser(userId: string) {
    const response = await fetch(
      `${protocol}//${host}/api/users?userId=${userId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("User does not exist");
    }
    return response.json();
  }

  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery<UserData>({
    queryKey: ["users", offset],
    queryFn: fetchUsers,
  });

  const { mutate: deleteUser } = useMutation({
    mutationKey: ["users"],
    mutationFn: removeUser,
    onSuccess: (data) => {
      refetch();
      toast(data.message);
    },
    onError: (error) => {
      toast(error.message, {
        style: { background: "#ff6666", color: "white" },
      });
    },
  });

  return (
    <main className="min-h-screen xl:pt-10 pb-10 w-full" id="demo">
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

        <Card className="bg-teal-400/10 border-teal-400/20 shadow">
          {!selectedUsername ? (
            <>
              <CardContent className="flex flex-col gap-4 h-full">
                {
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
                        "overflow-y-hidden min-h-[270px]",
                        (isLoading || !userData || userData.userCount === 0) &&
                          "items-center flex justify-center",
                        viewJson && "min-h-[580px]"
                      )}
                    >
                      {isLoading ? (
                        <LoadingSpinner />
                      ) : !userData || userData.userCount === 0 ? (
                        <div className="flex items-center justify-center h-full">
                          <NoResults title="No Users" />
                        </div>
                      ) : viewJson ? (
                        <PrettyObject>{userData}</PrettyObject>
                      ) : (
                        <div className="flex h-full gap-2">
                          {userData?.users.map((user) => (
                            <UserCard
                              user={user}
                              key={user.id}
                              onDelete={(userId: string) => deleteUser(userId)}
                              setSelectedUsername={setSelectedUsername}
                            />
                          ))}
                        </div>
                      )}
                    </TabsContent>
                    <TabsContent value="posts">Posts data here</TabsContent>
                  </Tabs>
                }
              </CardContent>
              <CardFooter>
                <CustomPagination
                  limit={limit}
                  label="Users"
                  offset={offset}
                  count={userData?.userCount || 0}
                  setOffset={setOffset}
                />
              </CardFooter>
            </>
          ) : (
            <MessageInterface
              selectedUsername={selectedUsername}
              setSelectedUsername={setSelectedUsername}
            />
          )}
        </Card>
      </section>
    </main>
  );
}

type UserCardProps = {
  user: {
    id: string;
    username: string;
    createdAt: Date;
    profileImageUrl: string;
  };
  onDelete: (userId: string) => void;
  setSelectedUsername: Dispatch<SetStateAction<string>>;
};

function UserCard({ user, onDelete, setSelectedUsername }: UserCardProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  return (
    <>
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="dark:bg-gray-900 border border-white/30">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Friend?</AlertDialogTitle>
            <AlertDialogDescription>
              {`Are you sure you want to remove '${user.username}' as a friend?`}
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel className="hover:cursor-pointer">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  setShowConfirmDialog(false);
                  onDelete(user.id);
                }}
                className="hover:cursor-pointer"
              >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
      <Card className="dark:bg-slate-400/80 bg-inherit shadow border py-0 rounded-md gap-2">
        <div className=" dark:bg-slate-300/50 bg-teal-300/30 px-3 rounded-md rounded-b-none p-2 pb-0">
          <Image
            src={user.profileImageUrl}
            alt="Avatar"
            width={300}
            height={300}
            className=" h-26"
          />
        </div>
        <div className="p-4 pt-0 items-center gap-2 flex flex-col">
          <p className="font-semibold">{user.username}</p>
          <div className="w-full pt-2 gap-2 flex flex-col">
            <Button
              onClick={() => setSelectedUsername(user.username)}
              className="dark:bg-teal-100/90 shadow-sm cursor-pointer hover:bg-teal-500/40 bg-teal-500/50 text-primary dark:hover:bg-teal-100/80 dark:text-secondary w-full"
            >
              Message
            </Button>
            <Button
              onClick={() => setShowConfirmDialog(!showConfirmDialog)}
              className="bg-red-500/60 shadow dark:bg-red-400/90 dark:hover:bg-red-400/80 cursor-pointer text-primary hover:bg-red-500/50 dark:text-secondary"
            >
              Remove Friend
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}

type MessageInterfaceProps = {
  selectedUsername: string;
  setSelectedUsername: Dispatch<SetStateAction<string>>;
};

function MessageInterface({
  selectedUsername,
  setSelectedUsername,
}: MessageInterfaceProps) {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  function sendMessage(message: string) {
    if (!!messageInput) {
      setMessages([...messages, message]);
    }
    setMessageInput("");
  }

  return (
    <div className="min-h-96 p-5 pt-0 flex flex-col">
      <header className="flex items-center w-full mb-3">
        <Button
          onClick={() => setSelectedUsername("")}
          className="cursor-pointer text-primary"
          variant={"ghost"}
        >
          <ArrowLeft />
          Back
        </Button>
        <p className="text-primary ml-52">Messaging {selectedUsername}</p>
      </header>

      <div className=" h-90 flex flex-col items-end gap-2 overflow-auto overflow-x-hidden">
        {messages.length > 0 ? (
          messages.map((message: string, index: number) => (
            <div
              key={index}
              className="py-2 flex justify-end border border-primary rounded-lg"
            >
              <pre className="text-sm px-2 max-w-96 truncate text-primary">
                {message}
              </pre>
            </div>
          ))
        ) : (
          <div className="w-full h-full">
            <NoResults title="No Messages" />
          </div>
        )}
      </div>

      <footer className="flex-1 pt-2 flex gap-2">
        <Input
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Send a message..."
          className="border  border-black dark:border-white text-primary"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage(messageInput);
            }
          }}
        />
        <Button
          onClick={() => sendMessage(messageInput)}
          className="dark:bg-teal-400/80 bg-teal-700 cursor-pointer hover:bg-teal-700/80 dark:hover:bg-teal-700/90"
        >
          Send
        </Button>
      </footer>
    </div>
  );
}
