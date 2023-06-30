class VacationModel {
  
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
  
}

export default VacationModel