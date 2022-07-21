//genera las anclas. [id].jsx genera los archivos
import Layout from "../../components/Layout"
import Link from "next/link"

export default function index( {data} ) { 
  return (
    <Layout>
       <h1>Lista de blog</h1> 
       {data.map(({id, title, body }) => ( //recorrer arreglo de objetos con map
          <div key={id}>
            <h3>
              <Link href={`/blog/${id}`}>
                <a>{id} - {title}</a>
              </Link>              
            </h3>
            <p>{body}</p>
          </div>
        ))}       
    </Layout>
  );
}

export async function getStaticProps () { //getStaticProps para contenido estático //getServerSideProps para que consulte el Servidor (dinámico)
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    return {
      props: {
        data, //la data consumida lo manda a la funcion index
      },
    };
  } catch (error) {
    console.log(error);
  }
}


