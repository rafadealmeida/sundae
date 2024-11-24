"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

// Mock user data - replace with actual data fetching in a real application
const users = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Desenvolvedor",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Designer",
    avatar: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 3,
    name: "Charlie Brown",
    role: "Gerente de Projeto",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Diana Ross",
    role: "QA Analyst",
    avatar: "https://i.pravatar.cc/150?img=20",
  },
];

export function UserTable() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <Button variant="outline" size="icon" onClick={() => setOpen(!open)}>
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command className="rounded-lg border shadow-md md:min-w-[450px]">
            <CommandInput
              placeholder="Type a command or search..."
              className="my-4"
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandSeparator />
              <CommandGroup heading="Users">
                {users.map((user) => (
                  <CommandItem key={`command_${user.id}`}>
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Cargo</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Link href={`/admin/users/${user.id}/report`}>
                  <Button variant="outline">Ver Relatório</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
