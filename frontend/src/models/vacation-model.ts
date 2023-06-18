class VacationModel{
    map(arg0: (v: any) => JSX.Element): import("react").ReactNode {
        throw new Error("Method not implemented.");
    } 

  public vacationId: number;
  public vacationDestination: string;
  public vacationDescription: string;
  public startDate: string;
  public endDate: string;
  public price: number;
  public image: File; // Image file


  public imageUrl: string; // Image full url
  public isFollowing: number;
  public followersCount: number;
    destination: any;
    data: any;
}

export default VacationModel