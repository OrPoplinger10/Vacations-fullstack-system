import { useForm } from "react-hook-form";
import "./EditVacation.css";
import { useNavigate, useParams } from "react-router-dom";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import VacationModel from "../../../models/vacation-model";
import { useEffect, useState } from "react";

function EditVacation(): JSX.Element {
  const { register, handleSubmit, setValue } = useForm<VacationModel>({ });  
  const [vacation, setVacation] = useState<VacationModel>();
  const params = useParams();
  const navigate = useNavigate();
  const vacationId = +params.vacationId;

  function formattingDate(propsDate: string): string {
    const date = new Date(propsDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const localDateString = `${year}-${month}-${day}`;
    return localDateString;
  };

  // Get vacation to edit:
  useEffect(() => {
    if (!vacation) {
      dataService
        .getOneVacation(vacationId)
        .then((responseVacation) => {
          setVacation(responseVacation);
        })
        .catch((err) => alert(err.message));
    } else {
      setValue("vacationId", vacation?.vacationId);
      setValue("vacationDestination", vacation?.vacationDestination);
      setValue("vacationDescription", vacation?.vacationDescription);
      setValue("startDate", formattingDate (vacation?.startDate));
      setValue("endDate", formattingDate (vacation?.endDate));
      setValue("price", vacation?.price);
      
    }
  }, [vacation, vacationId, setValue]);  

  async function send(vacation: VacationModel) {
    try {
      vacation.image = (vacation.image as unknown as FileList)[0];
      await dataService.editVacation(vacation);
      notifyService.success("vacation has been updated !");
      navigate("/vacations");
      console.log(vacation.imageUrl);
      console.log(vacation.image);

    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="EditVacation">
      <div className="editVacation-box">
        <div>
          <h2 className="titleEdit">Edit vacation</h2>
        </div>
          <form onSubmit={handleSubmit(send)} className="form-wrapper" >
            <div className="vacationIdInput">
              <input
                name="vacationId"
                className="input"
                type="hidden"
                {...register("vacationId")}
              />
            </div>
            <div className="destination">
              <label className="label">Destination :</label>
              <input
                name="vacationDestination"
                className="input"
                type="text"
                {...register("vacationDestination")}
                required
              />
            </div>
            <div className="descriptionToEdit">
              <label className="label">Description :</label>
              <textarea
                className="textArea"
                name="vacationDescription"
                {...register("vacationDescription")}
                required
              />
            </div>
            <div className="startDate">
              <label className="label">Start on :</label>
              <input
                name="startDate"
                className="input"
                type="date"
                {...register("startDate")}
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="endDate">
              <label className="label">End on :</label>
              <input
                name="endDate"
                className="input"
                type="date"
                {...register("endDate")}
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="price">
              <label className="label">Price :</label>
              <input
                name="price"
                className="input"
                type="number"
                {...register("price")}
                required
                min={0}
                max={10000}
              />
            </div>
            <div className="image">
              <label className="label">Image :</label>
              <br></br>
              <input
                className="inputImage"
                type="file"
                accept="image/*"
                {...register("image")}
                multiple
              />
            </div>
            <div>
              <button className="submit">Update</button>
            </div>
          </form>
      </div>
    </div>
  );
}

export default EditVacation;






  





