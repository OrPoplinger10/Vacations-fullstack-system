import { useForm } from "react-hook-form";
import VacationModel from "../../../models/vacation-model";
import "./AddVacation.css";
import notifyService from "../../../Services/NotifyService";
import dataService from "../../../Services/DataService";
import { useNavigate } from "react-router-dom";

function AddVacation(): JSX.Element {

    const { register, handleSubmit } = useForm<VacationModel>();
    
    const navigate = useNavigate();
    

     async function send(vacation: VacationModel) {
        try{
            
           vacation.image = (vacation.image as unknown as FileList)[0];
            await dataService.addVacation(vacation);
            notifyService.success("vacation has been added !");
            navigate("/vacations");
            
        }
        catch(err:any) {
            notifyService.error(err);
            
        }
        
      }
    
    return (
        <div className="AddVacation">
            <div className="addVacation-box">
                <div>
                    <h2 className="titleAdd">Add vacation</h2>
                </div>
                <form onSubmit={handleSubmit(send)} className="form-wrapper">
                    <div className="destination">
                        <label className="label">Destination :</label>
                        <input className="input" type="text"{...register("vacationDestination")} required />

                        </div>
                        <div className="descriptionToAdd">
                        <label className="label">Description :</label>
                        <textarea className="textArea" name="description" {...register("vacationDescription")}  required />
                        </div>

                    <div className="startDate">
                        <label className="label">Start on :</label>
                        <input className="input" type="date"  {...register("startDate")}  required min={new Date().toISOString().split('T')[0]}  />
                    </div>
                    <div className="endDate">
                        <label className="label">End on :</label>
                        <input className="input" type="date" {...register("endDate")}  required min={new Date().toISOString().split('T')[0]}/>
                    </div>
                    <div className="price">
                        <label className="label">Price :</label>
                        <input className="input" type="number" {...register("price")}   required min={0} max={10000}  />
                    </div>
                    <div className="image">
                        <label className="label">Image :</label>
                        <br></br>
                        <input className="inputImage" type="file" accept="image/*" {...register("image")} multiple required  />
                    </div>
                    <div>
                        <button className ="submit">Add</button>
                    </div>
                </form>
        </div>
        </div>
    );
}

export default AddVacation;
