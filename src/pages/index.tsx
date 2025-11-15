'use-client';

import Form from '@/components/form/form';
import Main from '@/components/main/main';
import Head from 'next/head';

export default function Index() {
  return (
    <>
      <Head>
        <title>Simple Addition AI</title>
      </Head>
      <Main>
        <Form></Form>
      </Main>
    </>
  );
}
