import React from 'react'
import { Client } from "../../prismic";
import Prismic from "prismic-javascript";
import { useRouter } from 'next/dist/client/router';
import { RichText } from 'prismic-reactjs';
import Head from 'next/head';

const Peli = (props: any) => {
    const router = useRouter();
    if (router.isFallback) {
        return <h3>Cargando...</h3>
    }
    return (
        <div>
            <Head>
                <title>{props.data.meta_title} | prop.data.meta_description</title>
            </Head>
            <RichText render={props.data.title} />
            <RichText render={props.data.synopsis} />
            <span>{props.data.year}</span>
        </div>
    )
}

export const getStaticPaths = async () => {
    const client = Client();
    const queryResult = await client.query([
        Prismic.Predicates.at("document.type", "movie"),
    ]);
    return {
        paths: queryResult.results.map(p => ({ params: { uid: p.uid } })),
        fallback: true,
    }
}

export const getStaticProps = async (context: any) => {
    const client = Client();
    const queryResult = await client.getByUID('movie', context.params.uid, {});
    return {
        props: queryResult,
        revalidate: 5
    }
}

export default Peli;