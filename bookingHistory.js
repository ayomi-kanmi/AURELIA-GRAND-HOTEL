
             // ===============================
             // AURELIA BOOKING HISTORY 
             // ===============================
   let bookingHistoryContainer =document.getElementById("bookingHistory");
       
       let bookingDetails = document.getElementById("bookingDetails");
       
       let clearBookings = document.getElementById("clearBookings");
       
           // ===============================
           // GET SAVED BOOKING 
           // ===============================
      let savedBookings = localStorage.getItem("bookingHistory") ;
      if(savedBookings) {
          let bookingHistory = JSON.parse(savedBookings);
          
          // ===============================
           // SHOW NEWEST BOOKING FIRST
           // ===============================
           
           let latestBookings = [...bookingHistory].reverse();
           
           latestBookings.forEach(function (booking) {
           
               bookingHistoryContainer.innerHTML += `
                
                <div class="booking-history-card">
                    <h2> ${booking.room.name} </h2>
                    
                     <p> <strong>Booking ID:</Strong>
                   ${booking.id} </p>
                   
                   <p> <strong>Guest:</Strong>
                   ${booking.guest.name} </p>
                   
                   <p> <strong>Phone:</Strong>
                   ${booking.guest.phone} </p>
                   
                   <p> <strong>Check-In:</Strong>
                   ${booking.checkIn} </p>
                   
                   <p> <strong>Check-out:</Strong>
                   ${booking.checkOut} </p>
                    
                    <p> <strong>Nights:</Strong>
                   ${booking.nights} </p>
                   
                   <p> <strong> Guest:</Strong>
                   ${booking.guests} </p>
                   
                   <h3> <strong>Total:</Strong>
                   ${booking.total.toLocaleString()} </h3>
                   
                  <p> <strong>Status:</Strong>
                   ${booking.status} </p>      
                   
                   <p> <strong>Booking Date:</Strong>
                   ${booking.date} </p>      
                   
                   <button class="viewBooking" data-id="${booking.id}"> View Details </button >
                   
                    <button class="cancelBooking" data-id="${booking.id}"> Cancel Booking </button >
                    
                   </div>    
                `;
           })
           
             // ===============================
              // VIEW BOOKING DETAILS 
              // ===============================
          let viewButtons = document.querySelectorAll(".viewBooking");
          
          viewButtons.forEach(function (button) {
              button.addEventListener("click", function () {
                  let bookingId = button.dataset.id;
                  
                  let selectedBooking = bookingHistory.find(function (booking) {
                      return(booking.id === bookingId);
                  });
                 
                 if(selectedBooking) {
                     bookingDetails.innerHTML = `
                      <div class="booking-details-card">
                          
                            <h2> ${selectedBooking.room.name} </h2>
                            
                         <p> <strong>Booking ID:</Strong>
                   ${selectedBooking.id} </p>
                   
                     <p> <strong>Guest:</Strong>
                   ${selectedBooking.guest.name} </p>
                   
                   <p> <strong>Phone:</Strong>
                   ${selectedBooking.guest.phone} </p>
                   
                    <p> <strong>Room Price:</Strong>
                   ${selectedBooking.room.price.toLocaleString()}/ night </p>
                   
                   <p> <strong>Check-In:</Strong>
                   ${selectedBooking.checkIn} </p>
                   
                   <p> <strong>Check-out:</Strong>
                   ${selectedBooking.checkOut} </p>
                    
                    <p> <strong>Nights:</Strong>
                   ${selectedBooking.nights} </p>
                   
                   <p> <strong> Guest:</Strong>
                   ${selectedBooking.guests} </p>
                   
                   <h3> <strong>Total:</Strong>
                   ${selectedBooking.total.toLocaleString()} </h3>
                   
                  <p> <strong>Status:</Strong>
                   ${selectedBooking.status} </p>      
                   
                   <p> <strong>Booking Date:</Strong>
                   ${selectedBooking.date} </p>      
                      
                      </div>        
                     `;
                 }
              })
          })
          
              // ===============================
              // CANCEL INDIVIDUAL BOOKING 
              // ===============================
            let cancelButtons = document.querySelectorAll(".cancelBooking");
            
            cancelButtons.forEach(function (button) {
                button.addEventListener("click", function () {
                    let bookingId = button.dataset.id;
                    
                    let confirmCancel = confirm("Are you sure you want to cancel this booking?");
                    
                    if(confirmCancel) {
                    bookingHistory = bookingHistory.filter(function (booking) {
                        return (booking.id !== bookingId);
                    });
                    
                    localStorage.setItem("bookingHistory", JSON.stringify(bookingHistory));
                    
                    button.closest(".booking-history-card").remove();
                    
                    bookingDetails.innerHTML = "";
                        
                    }
                });
            });
            
              } else{
              
                  bookingHistoryContainer.innerHTML = `
                  <p> No booking found. 🏩</p>   
                   
                  `;
              }
              
              //===============================
              // CLEAR ALL BOOKINGS
              // ===============================
       clearBookings.addEventListener("click", function () {
           let confirmClear = confirm(
               "Are you sure you want to clear all booking history?"
           );
           
           if(confirmClear) {
               localStorage.removeItem("bookingHistory");
               
           bookingHistoryContainer.innerHTML = `
           
           <p> Booking history cleared. 🏩</p> 
           
           `;
           
           bookingDetails.innerHTML = "" ;
           }
       });  
       
             // ===============================
              // BACK HOME 
              // ===============================
       let backHome = document.getElementById("backHome") ;
       
       backHome.addEventListener("click", function () {
           window.location.href = "index.html";
       }) ;        
                  
              
              
              
        
       
       