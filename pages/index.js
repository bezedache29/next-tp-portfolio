import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="description" content="Portfolio" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <title>Portfolio</title>
      </Head>

      <div className="row g-0 justify-content-center align-items-center">
        <img src="https://static.wixstatic.com/media/809fa5_c02c7069a7f246ed986e103ade08b3d1~mv2.gif" alt="" />
      </div>
    </>
    
  )
}
