import type { NextPage } from 'next'
import ContactComponent from '../component/Contact'
import Layout from "../component/layout";

const Contact: NextPage = () => {
  return (
    <Layout>
     <ContactComponent></ContactComponent>
  </Layout>
  )
}

export default Contact
