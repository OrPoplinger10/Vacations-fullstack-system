import { useForm } from "react-hook-form";
import "./Register.css";
import UserModel from "../../../models/user-model";
import authService from "../../../Services/AuthService";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";

function Register(): JSX.Element {

const { register, handleSubmit } = useForm<UserModel>();
const navigate = useNavigate();

async function send(user: UserModel) {

    try{
        await authService.register(user);
        notifyService.success("Welcome!");
        navigate("/home");

    }
    catch(err: any) {
        notifyService.error(err)
    }

}

    return (
        <div className="Register">
            <div className="register-box">
                <div>
                    <h2 className="title">Create Account</h2>
                </div>
                <form onSubmit={handleSubmit(send)} className="form-wrapper">
                    <div className="firstName">
                        <label className="label">FirstName :</label>
                        <input className="input" type="text" {...register("firstName")} required />
                    </div>
                    <div className="lastName">
                        <label className="label">lastName :</label>
                        <input className="input" type="text" {...register("lastName")} required />
                    </div>
                    <div className="email">
                        <label className="label">Email :</label>
                        <input className="input" type="email" {...register("email")} required />
                    </div>
                    <div className="password">
                        <label className="label">Password :</label>
                        <input className="input" type="password" {...register("password")} required min="4" />
                    </div>
                    <div>
                        <button className ="submit">Register</button>
                    </div>
                </form>
			</div>
        </div>
    );
}

export default Register;



