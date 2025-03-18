import { CustomPagination } from "@/components/custom/CustomPagination";
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";
import { PrettyObject } from "@/components/custom/PrettyObject";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { useDebounceValue } from "usehooks-ts";
import { CreateUser } from "@/components/forms/CreateUser";

type User = {
  id: string;
  username: string;
  createdAt: Date;
  profileImageUrl: string;
};

type UserData = {
  users: User[];
  userCount: number;
};

export function Demo() {
  const [viewJson, setViewJson] = useState(false);
  const [createUser, setCreateUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [search, setSearch] = useDebounceValue("", 500);
  const [limit] = useState(5);
  const [offset, setOffset] = useState(0);

  const protocol = window.location.protocol;
  const host = window.location.host;

  async function fetchUsers() {
    const response = await fetch(
      `${protocol}//${host}/api/users?limit=${limit}&offset=${offset}&search=${search}`,
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
    queryKey: ["users", offset, search],
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

  useEffect(() => {
    setOffset(0);
  }, [search]);

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
          This project showcases my full-stack development skills through a user
          management interface. Randomly generated users are seeded into a
          SQLite database hosted on{" "}
          <a
            href="https://turso.tech/"
            className="text-primary hover:text-blue-400"
            target="_blank"
          >
            Turso
          </a>{" "}
          and displayed with pagination and a debounced search input. Data
          fetching and updates are handled efficiently with TanStack Query,
          while the backend routes utilize the Next.js request/response
          paradigm.
        </p>

        <Card
          className={cn(
            "bg-teal-400/10 border-teal-400/20 shadow",
            (selectedUser || createUser) && "py-0"
          )}
        >
          {createUser ? (
            <CreateUser onBack={() => setCreateUser(false)} />
          ) : !selectedUser ? (
            <>
              <CardContent className="flex flex-col gap-4 h-full">
                <section
                  className={cn(
                    "overflow-hidden min-h-[330px] space-y-4 p-2 flex flex-col"
                  )}
                >
                  <div className="flex items-center space-x-2 pb-4 text-primary">
                    <Input
                      type="search"
                      placeholder="Search Users..."
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-[250px] border-primary text-primary"
                    />
                    <Button onClick={() => setCreateUser(true)}>
                      Create User
                    </Button>

                    <span className="flex-1" />
                    <Switch
                      id="json"
                      checked={viewJson}
                      onCheckedChange={setViewJson}
                    />
                    <Label htmlFor="json">View JSON</Label>
                  </div>
                  <div
                    className={cn(
                      "flex items-center flex-1",
                      (isLoading || userData?.userCount === 0) &&
                        "justify-center"
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
                      <div className="flex gap-1 overflow-auto">
                        {userData?.users.map((user) => (
                          <UserCard
                            user={user}
                            key={user.id}
                            onDelete={(userId: string) => deleteUser(userId)}
                            setSelectedUser={setSelectedUser}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </section>
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
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
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
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>;
};

function UserCard({ user, onDelete, setSelectedUser }: UserCardProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  return (
    <>
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="dark:bg-gray-900 border border-white/30">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove User?</AlertDialogTitle>
            <AlertDialogDescription>
              {`Are you sure you want to remove user '${user.username}'?`}
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
      <Card className="dark:bg-slate-400/80 bg-inherit shadow border border-primary/50 py-0 rounded-md gap-2 ">
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
              onClick={() => setSelectedUser(user)}
              className="dark:bg-teal-100/90 shadow-sm cursor-pointer hover:bg-teal-500/40 bg-teal-500/50 text-primary dark:hover:bg-teal-100/80 dark:text-secondary w-full"
            >
              Message
            </Button>
            <Button
              onClick={() => setShowConfirmDialog(!showConfirmDialog)}
              className="bg-red-500/60 shadow dark:bg-red-400/90 dark:hover:bg-red-400/80 cursor-pointer text-primary hover:bg-red-500/50 dark:text-secondary"
            >
              Remove User
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}

type MessageInterfaceProps = {
  selectedUser: User | undefined;
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>;
};

function MessageInterface({
  selectedUser,
  setSelectedUser,
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
    <main className="flex gap-2 p-2 ">
      <div className="min-h-96 p-5 pt-0 flex flex-col border border-primary/50 rounded-lg w-full lg:w-full md:w-2/3 2xl:w-2/3 shadow">
        <header className="flex items-center w-full pt-4">
          <Button
            onClick={() => setSelectedUser(undefined)}
            className="cursor-pointer text-primary"
            variant={"ghost"}
          >
            <ArrowLeft />
            Back
          </Button>
        </header>

        <div className=" h-90 flex flex-col items-end gap-2 overflow-auto overflow-x-hidden ">
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
            className="border  border-primary/50 text-primary"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage(messageInput);
              }
            }}
          />
          <Button
            onClick={() => sendMessage(messageInput)}
            className="dark:bg-teal-100/90 bg-teal-700 cursor-pointer hover:bg-teal-700/80 dark:hover:bg-teal-100/80"
          >
            Send
          </Button>
        </footer>
      </div>

      <Card className="dark:bg-slate-400/80 bg-inherit shadow border border-primary/50 py-0 rounded-md gap-2 w-1/3 hidden md:block lg:hidden 2xl:block">
        <div className=" dark:bg-slate-300/50 bg-teal-300/30 px-3 rounded-md rounded-b-none p-2 pb-0 flex justify-center">
          <Image
            src={selectedUser?.profileImageUrl || ""}
            alt="Avatar"
            width={300}
            height={300}
            className=" h-56"
          />
        </div>
        <div className="p-4 pt-3 items-center gap-2 flex flex-col">
          <p className="font-semibold text-xl">{selectedUser?.username}</p>
          <p>Registered since Mar 13, 2025</p>
        </div>
      </Card>
    </main>
  );
}
