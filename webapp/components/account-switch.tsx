"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { UserCog } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import EntitySelector from "./entity-selector";
import { getUsers } from "@/services/user/get-users";
import ClientContext from "./client-context";
import { useCallback, useState } from "react";
import switchUser from "@/services/session/switch-user";
import { useRouter } from "next/navigation";
import { useToast } from "@/lib/hooks/use-toast";

export default function AccountSwitch() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<string>();
  const onClick = useCallback(() => {
    if (!user) return;
    switchUser(user).then(() => {
      router.refresh();
      toast({
        title: "Switched to user id: " + user,
      });
    });
  }, [user, router, toast]);

  return (
    <ClientContext>
      <Popover>
        <PopoverTrigger>
          <Button
            asChild
            className="fixed right-0 top-1/2 transform -translate-y-1/2 z-10"
            size="icon"
          >
            <div>
              <UserCog />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Card className="z-10">
            <CardHeader>
              <CardTitle>Switch Account</CardTitle>
            </CardHeader>
            <CardContent>
              <Label>Account</Label>
              <EntitySelector queryAction={getUsers} onChange={setUser} />
              <Button className="mt-4 w-full" onClick={onClick}>
                Switch
              </Button>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </ClientContext>
  );
}
