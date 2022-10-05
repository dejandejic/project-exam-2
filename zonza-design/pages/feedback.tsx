import type { NextPage } from "next";
import FeedbackComponent from "../component/Feedback";
import Layout from "../component/layout";

const Feedback: NextPage = () => {
    return (
        <Layout>
            <FeedbackComponent></FeedbackComponent>
        </Layout>
    );
};

export default Feedback;
