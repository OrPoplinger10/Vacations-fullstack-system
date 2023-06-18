import { useForm } from "react-hook-form";
import "./Contact.css";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";

function Contact(): JSX.Element {
    const { handleSubmit } = useForm();
    const navigate = useNavigate();

    function sendContactDetails(): void {
        try{
            
            notifyService.success("Your contact details have been successfully received");
            navigate("/home");

        }
        catch(err:any) {
            notifyService.error(err);
            
        }
      }

    return (
        <div className="List">
            <div className="contactUs-box">
                <div>
                    <h2 className="contactTitle">Contact Us</h2>
                </div>
                <form onSubmit={handleSubmit(sendContactDetails)} className="form-wrapper">
                    <div className="fullName">
                        <label className="label">FullName :</label>
                        <input className="input" type="text" required minLength={3} maxLength={1000} />
                        </div>

                        <div className="contactEmail">
                        <label className="label">Email :</label>
                        <input className="input" type="email"  required />
                       </div>

                       <div className="phone">
                        <label className="label">Phone :</label>
                        <input className="input" type="number" required min={1} max={12} />
                        </div>

                        <div className="message">
                        <label className="label">Message :</label>
                        <textarea className="textArea" name="message" required />
                        </div>
                        <button className ="contactBth">Send</button>

                </form>
        </div>	
        </div>
    );
}

export default Contact;
