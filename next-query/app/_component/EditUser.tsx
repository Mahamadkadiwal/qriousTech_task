import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { updateUser } from '../_lib/apiData';
import { User } from '../_lib/userSchema';

export default function EditUser({user}: {user: User}) {
    const qc = useQueryClient();
    const [name, setName] = useState(user.name||"");

    const mutation = useMutation({
        mutationFn: () => updateUser(user.id, {name}),
        onSuccess: () => qc.invalidateQueries({queryKey: ['users']}),
    });

  return (
    <div className="mt-2">
      <input
        className="border px-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        onClick={() => mutation.mutate()}
        className="ml-2 bg-green-500 text-white px-2"
      >
        {mutation.isPending ? "Updating..." : "Update"}
      </button>
    </div>
  )
}
