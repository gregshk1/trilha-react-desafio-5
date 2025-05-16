import { createClient } from '@supabase/supabase-js';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function getServerSideProps() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  return {
    props: {
      posts: posts || [],
    },
  };
}

export default function HomePage({ posts }) {
  return (
    <Layout>
      <Header name="Página Inicial" />
      <main className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Posts disponíveis</h1>

        <Link href="/posts/create">
          <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4">Criar novo post</button>
        </Link>

        <ul>
          {posts.map((post) => (
            <li key={post.id} className="mb-4 border p-4 rounded">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-600">{post.description}</p>
              <div className="flex gap-2 mt-2">
                <Link href={`/posts/${post.id}`}>
                  <button className="bg-green-600 text-white px-3 py-1 rounded">Ver</button>
                </Link>
                <Link href={`/posts/delete/${post.id}`}>
                  <button className="bg-red-600 text-white px-3 py-1 rounded">Excluir</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <Footer copyrightText="George © 2025" />
    </Layout>
  );
}
