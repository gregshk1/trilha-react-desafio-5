import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function DeletePostPage() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    const deletePost = async () => {
      await supabase.from('posts').delete().eq('id', id);
      router.push('/');
    };

    deletePost();
  }, [id]);

  return <p className="p-4">Excluindo post...</p>;
}
