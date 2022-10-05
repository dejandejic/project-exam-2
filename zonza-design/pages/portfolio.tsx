import type { NextPage } from "next";
import Layout from "../component/layout";
import PortfolioComponent from "../component/Portfolio";

const Home: NextPage = () => {
    return (
        <Layout>
            <PortfolioComponent></PortfolioComponent>
        </Layout>
    );
};

export default Home;
