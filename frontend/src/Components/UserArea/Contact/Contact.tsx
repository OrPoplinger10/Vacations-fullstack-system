import { useForm } from "react-hook-form";
import "./Contact.css";
import { useNavigate } from "react-router-dom";
import contactsService from "../../../Services/ContactsService";
import notifyService from "../../../Services/NotifyService";
import ContactModel from "../../../Models/Contact-model";



function Contact(): JSX.Element {

    const { register, handleSubmit } = useForm<ContactModel>();
    
    const navigate = useNavigate();

   async function sendContactDetails(contact: ContactModel) {
        try{
            
           await contactsService.addContacts(contact);
            notifyService.success("Your request has been accepted, our representatives will contact you as soon as possible.");
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
                        <input className="input" type="text" {...register("fullName")} required minLength={3} maxLength={1000} />
                        </div>

                        <div className="contactEmail">
                        <label className="label">Email :</label>
                        <input className="input" type="email" {...register("email")}  required />
                       </div>

                       <div className="phone">
                        <label className="label">Phone :</label>
                        <input className="input" type="text" {...register("phone")} pattern="[0-9]{5,14}" required  />
                        </div>

                        <div className="message">
                        <label className="label">Message :</label>
                        <textarea className="textArea" name="message" {...register("message")} required />
                        </div>
                        <button className ="contactBth">Send</button>

                </form>
        </div>	
        </div>
    );
}

export default Contact;
