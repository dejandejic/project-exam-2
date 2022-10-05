import type { NextPage } from 'next'
import HeaderComponent from '../component/Header'
import HomeComponent from '../component/Home'
import Layout from "../component/layout";

const Home: NextPage = () => {
  return (  
    <Layout>
    <HomeComponent></HomeComponent>
  </Layout>
  )
}

export default Home
