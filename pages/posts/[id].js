import { createClient } from '@supabase/supabase-js';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function getServerSideProps({ params }) {
  const { id } = params;

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

    console.log('Data:', data);
    console.log('Error:', error);

  if (error || !data) {

    return { notFound: true };
  }

  return {
    props: { post: data },
  };
}

export default function PostDetailPage({ post }) {
  return (
    <Layout>
      <SEO title={post.title} description={post.description} />
      <Header name="Detalhes do Post" />
      <main className="p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        {post.description && (
          <p className="text-lg mb-6 text-gray-600">{post.description}</p>
        )}
        <div className="prose dark:prose-invert">
          <p>{post.content}</p>
        </div>
      </main>
      <Footer copyrightText="George © 2025" />
    </Layout>
  );
}
