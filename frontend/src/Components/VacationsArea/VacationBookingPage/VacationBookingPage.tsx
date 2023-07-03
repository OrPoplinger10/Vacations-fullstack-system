import { useNavigate, useParams } from "react-router-dom";
import "./VacationBookingPage.css";
import { useEffect, useState } from "react";
import VacationModel from "../../../Models/Vacation-model";
import vacationService from "../../../Services/VacationsService";
import ordersService from "../../../Services/OrdersService";
import notifyService from "../../../Services/NotifyService";
import { useForm } from "react-hook-form";
import OrderModel from "../../../Models/Order-model";



function VacationBookingPage(): JSX.Element {
    const params = useParams();
    const [vacation, setVacation] = useState<VacationModel>();
    const { register, handleSubmit, setValue } = useForm<OrderModel>();
    
    const navigate = useNavigate();
    
    useEffect(() => {

      const vacationId = +params.vacationId;
  
      vacationService
        .getOneVacation(vacationId)
        .then(responseOneVacation => {
          const vacationData = Array.isArray(responseOneVacation)
            ? responseOneVacation[0] // Extract the first object from the array
            : responseOneVacation;
          setVacation(vacationData);
		  setValue("vacationId", responseOneVacation.vacationId);
		  
        })

        .catch(err => notifyService.error(err));
    }, []);

  
    if (!vacation) {
      return null; // Return null if vacation data is not available
    }

	async function sendOrderToDb(order: OrderModel) {
        try{
            await ordersService.addOrder(order);
            notifyService.success("Your order has been recorded in our information systems, our representatives will contact you later to make a secure payment");
            navigate("/vacations");

        }
        catch(err:any) {
            notifyService.error(err);
            
        }
        
      }
  
    return (
      <div className="VacationBookingPage">
        <div id="booking" className="section">
		<div className="section-center">
			<div className="container">
				<div className="row">
					<div className="booking-form">
						<div className="booking-bg">
							<div className="form-header">
								<h2>Make your reservation</h2>
								<h3>{vacation?.vacationDestination}</h3>
                <p className="description">{vacation?.vacationDescription}</p>
							</div>
						</div>
						<form onSubmit={handleSubmit(sendOrderToDb)}>
						<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<input id="vacationIdInput" className="form-control" type="hidden" {...register("vacationId")} />
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<span className="form-label">fullName :</span>
										<input  className="form-control" type="text"  {...register("fullName")} required minLength={3} maxLength={1000}/>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<span className="form-label">Adults :</span>
										<select className="form-control" {...register("adults")}>
											<option>1</option>
											<option>2</option>
											<option>3</option>
											<option>4</option>
											<option>5</option>
											<option>6</option>
										</select>
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<span className="form-label">Kids :</span>
										<select className="form-control" {...register("kids")}>
											<option>0</option>
											<option>1</option>
											<option>2</option>
											<option>3</option>
											<option>4</option>
											<option>5</option>
											<option>6</option>
										</select>
									</div>
								</div>
							<div className="col-md-6">
									<div className="form-group">
										<span className="form-label">Rooms Number :</span>
										<select className="form-control" {...register("roomsNumber")}>
											<option>1</option>
											<option>2</option>
											<option>3</option>
											<option>4</option>
											<option>5</option>
											<option>6</option>
										</select>
									</div>
								</div>
								</div>
								<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<span className="form-label">Phone Number :</span>
										<input className="form-control" type="text" {...register("phoneNumber")} pattern="[0-9]{5,14}" required />
									</div>
								</div>
							</div>
							<div className="form-btn">
								<button className="submit-btn">Book vacation</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
      </div>
    );
  }
  
  export default VacationBookingPage;



