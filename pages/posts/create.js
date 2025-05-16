import { useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function CreatePostPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    description: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from('posts').insert([
      {
        title: form.title,
        description: form.description,
        content: form.content,
      },
    ]);

    if (error) {
      alert('Erro ao criar post');
      console.error(error);
    } else {
      router.push('/');
    }
  };

  return (
    <Layout>
      <Header name="Criar Post" />
      <main className="p-6 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Título"
            className="w-full border p-2 rounded"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Descrição"
            className="w-full border p-2 rounded"
            value={form.description}
            onChange={handleChange}
          />
          <textarea
            name="content"
            placeholder="Conteúdo"
            className="w-full border p-2 rounded"
            rows={6}
            value={form.content}
            onChange={handleChange}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
            Salvar Post
          </button>
        </form>
      </main>
      <Footer copyrightText="George © 2025" />
    </Layout>
  );
}
