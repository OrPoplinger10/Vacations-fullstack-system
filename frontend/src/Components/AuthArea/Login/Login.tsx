import "./Login.css";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../models/credentials-model";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import { useForm } from "react-hook-form";


function Login(): JSX.Element {
    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {

        try {
            await authService.login(credentials);
            notifyService.success("Welcome back!")
            navigate("/vacations");

        }
        catch (err: any) {
            notifyService.error(err)
        }

    }


    return (
        <div className="Login">
            <div className="login-box">
                <div>
                    <h2 className="title">Logged In</h2>
                </div>
                <form onSubmit={handleSubmit(send)} className="form-wrapper">
                    <div className="email">
                        <label className="label">Email :</label>
                        <input className="input" type="email" {...register("email")} required />
                    </div>
                    <div className="password">
                        <label className="label">Password :</label>
                        <input className="input" type="password" {...register("password")} required min="4" />
                    </div>
                    <div>
                        <button className="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
