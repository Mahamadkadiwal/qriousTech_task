"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {createUser} from "../_lib/apiData";
import { useState } from "react";
import z from "zod";

const createSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
});

export default function CreateUser() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({name: "", email: ""});

  const mutation = useMutation({
    mutationFn: () => createUser(form),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

 
  function submit(e: React.FormEvent) {
    e.preventDefault();
    createSchema.parse(form);
    mutation.mutate();
  }
  
  return (
   <form onSubmit={submit} className="flex gap-2">
      <input
        placeholder="name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border px-2"
      />
      <input
        placeholder="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="border px-2"
      />

      <button className="bg-blue-500 text-white px-3">
        {mutation.isPending ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
