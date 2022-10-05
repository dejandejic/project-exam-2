import style from "../styles/Contact.module.scss";
import "bootstrap/dist/css/bootstrap.css";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { SendContact } from "../services/indexServices";

interface FormInputs {
    name: string;
    email: string;
    message: string;
    subject: string;
}

const ContactComponent = () => {
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

    const submitForm = async (values: FormInputs) => {
        setUserData((v) => ({
            ...v,
            loading: true,
        }));
        await SendContact(values).then((data: any) => {
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
                        <h2>KONTAKT</h2>
                    </div>
                    <div className="row">
                        <div className="offset-md-2 col-md-8">
                            <div className={style.contactform}>
                                {userData.status === 0 && (
                                    <form onSubmit={handleSubmit(submitForm)}>
                                        <div className="row cst">
                                            <div className="col-md-12">
                                                <label>Navn</label>
                                                <input
                                                    type="text"
                                                    placeholder=""
                                                    {...register("name", {
                                                        required:
                                                            "Navn er nødvendig",
                                                    })}
                                                />
                                                <ErrorMessage
                                                    errors={errors}
                                                    className={"error"}
                                                    name="name"
                                                    as="p"
                                                />
                                            </div>
                                            <div className="col-md-12">
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
                                                    name="email"
                                                    className={"error"}
                                                    as="p"
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <label>Emne</label>
                                                <input
                                                    type="text"
                                                    {...register("subject", {
                                                        required:
                                                            "Emne er nødvendig",
                                                    })}
                                                    placeholder=""
                                                />
                                                <ErrorMessage
                                                    errors={errors}
                                                    className={"error"}
                                                    name="subject"
                                                    as="p"
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <textarea
                                                    {...register("message", {
                                                        required:
                                                            "Melding er nødvendig",
                                                    })}
                                                    placeholder="Skriv meldingen din  her..."
                                                ></textarea>
                                                <ErrorMessage
                                                    errors={errors}
                                                    className={"error"}
                                                    name="message"
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
export default ContactComponent;
