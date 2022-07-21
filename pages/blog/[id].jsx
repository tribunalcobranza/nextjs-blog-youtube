//[id].jsx genera los archivos
import Layout from "../../components/Layout";


export default function primerPost({data}) { // recibe de las funcion getStaticProps y getStaticPaths
  return (
    <Layout>        
        <h1>{data.id}  {data.title}</h1>     
        <p>{data.body}</p>     
    </Layout>
  );
}

//Estamos creando todos los archivos del 1 al 100. Obtenemos Rutas dinamicas que queremos pre-renderizar
export async function getStaticPaths () {// dinámico
  try {
    const res = await fetch ("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    const paths = data.map(({id}) => ({params: {id: `${id}`}})); //se pasa id a string
    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.log(error);
  }
}

// Accedemos a los datos proporcionados por objeto params: 1  2  3.. etc...
export async function getStaticProps ({params}) { //getStaticProps para contenido estático //getServerSideProps para que consulte el Servidor (dinámico)
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + params.id);
    const data = await res.json();
    return {
      props: {
        data, //la data consumida lo manda a la funcion primerPost arriba
      },
    }
  } catch (error) {
    console.log(error);
  }
}
