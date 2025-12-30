import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { deleteUser } from '../_lib/apiData';

export default function DeleteUser({id}: {id:number}) {
    const qc = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => deleteUser(id),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['users']}),
    })
  return (
    <button
      onClick={() => mutation.mutate()}
      className="mt-2 bg-red-500 text-white px-3"
    >
      {mutation.isPending ? "Deleting..." : "Delete"}
    </button>
  )
}
