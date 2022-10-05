import style from "../styles/Feedback.module.scss";
import "bootstrap/dist/css/bootstrap.css";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { SendFeedback } from "../services/indexServices";
import { useRouter } from "next/router";
import ReactStars from "react-rating-stars-component";

interface FormInputs {
    firstname: string;
    surname: string;
    email: string;
    subject: string;
    telephone: string;
    improve: string;
    image_id: number;
    rate: number;
}

const FeedbackComponent = () => {
    const router = useRouter();
    const [rate, setRate] = useState(0);
    const [userData, setUserData] = useState({
        loading: false,
        data: null,
        message: "",
        status: 0,
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormInputs>();

    const thirdExample = {
        size: 40,
        count: 5,
        isHalf: false,
        value: rate,
        color: "black",
        activeColor: "gold",
        onChange: (newValue: any) => {
            console.log(`Example 3: new value is ${newValue}`);
            setRate(newValue);
        },
    };

    const submitForm = async (values: FormInputs) => {
        setUserData((v) => ({
            ...v,
            loading: true,
        }));
        // values.image_id = id;
        values.rate = rate;
        await SendFeedback(values).then((data: any) => {
            if (data.success) {
                setUserData((v) => ({
                    ...v,
                    loading: false,
                    status: 1,
                }));
            } else {
                setUserData((v) => ({
                    ...v,
                    loading: false,
                }));
            }
        });
    };

    return (
        <div>
            <section className={style.servicessection}>
                <div className="container">
                    <div className={style.sectionTitle}>
                        <h2>Tilbakemelding</h2>
                    </div>
                    <div className="row">
                        <div className="offset-md-2 col-md-8">
                            <div className={style.contactform}>
                                {userData.status === 0 && (
                                    <form onSubmit={handleSubmit(submitForm)}>
                                        <div className="row cst">
                                            <div className="col-md-6">
                                                <label>Fornavn</label>
                                                <input
                                                    type="text"
                                                    {...register("firstname", {
                                                        required:
                                                            "Fornavn er nødvendig",
                                                    })}
                                                    placeholder=""
                                                />
                                                <ErrorMessage
                                                    errors={errors}
                                                    className={"error"}
                                                    name="firstname"
                                                    as="p"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label>Etternavn</label>
                                                <input
                                                    type="text"
                                                    {...register("surname", {
                                                        required:
                                                            "Etternavn er nødvendig",
                                                    })}
                                                    placeholder=""
                                                />
                                                <ErrorMessage
                                                    errors={errors}
                                                    className={"error"}
                                                    name="surname"
                                                    as="p"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label>Epost</label>
                                                <input
                                                    type="text"
                                                    {...register("email", {
                                                        required:
                                                            "Email er nødvendig",
                                                    })}
                                                    placeholder=""
                                                />
                                                <ErrorMessage
                                                    errors={errors}
                                                    className={"error"}
                                                    name="email"
                                                    as="p"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label>Telefon</label>
                                                <input
                                                    type="text"
                                                    {...register("telephone", {
                                                        required:
                                                            "Telefon er nødvendig",
                                                    })}
                                                    placeholder=""
                                                />
                                                <ErrorMessage
                                                    errors={errors}
                                                    className={"error"}
                                                    name="telephone"
                                                    as="p"
                                                />
                                            </div>
                                            <div className="col-md-12 rating">
                                                <label>Karakter</label>
                                                <ReactStars {...thirdExample} />
                                            </div>
                                            <div className="col-md-12">
                                                <textarea
                                                    {...register("improve")}
                                                    placeholder="Hvordan kan vi forbedre oss?"
                                                ></textarea>
                                                <ErrorMessage
                                                    errors={errors}
                                                    className={"error"}
                                                    name="improve"
                                                    as="p"
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <input
                                                    type="submit"
                                                    value={`${
                                                        userData.loading ===
                                                        true
                                                            ? `I PROSESS...`
                                                            : `SEND INN`
                                                    }`}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                )}
                                {userData.status === 1 && (
                                    <div className="row cst">
                                        <div className="col-md-12">
                                            <p className=" bg-success text-center text-white p-3">
                                                Tusen takk! Vi har mottatt din
                                                henvendelse!
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default FeedbackComponent;
