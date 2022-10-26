export const createReservation = (ReservationForm)=>{
    return {
 
        "reservation": {
            "number_people": ReservationForm.number_people,
            "hour": {
                "code": ReservationForm.code
            }
        }}
    }