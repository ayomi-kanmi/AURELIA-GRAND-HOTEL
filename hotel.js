           // ===============================
          // NAVMENU 
          // ===============================
alert("Welcome To AURELIA GRAND HOTEL 🏨");

var navMenu = document.getElementById("navmenu");

function openMenu(){
    navMenu.style.right = "0";
}

function closeMenu(){
    navMenu.style.right = "-200px";
}
       // ===============================
          // . GET THE BOOKING FORM
          // ===============================
          
        let bookingForm = document.getElementById("bookingForm");
          
      // ===============================
      //  ROOM INFORMATION 
      // ===============================
      
      let rooms = {
            "Deluxe Room":200000,
            "Executive Suites":250000,
            "Presidential Suites":350000
             };        
         
            // ===============================
           // FORM SUBMISSION 
           // ===============================
           
           if(bookingForm) {
               bookingForm.addEventListener("submit",function (event) {
                   event.preventDefault();
               
        
           // ===============================
           // GET CUSTOMER INFORMATION 
           // ===============================
       let guestName = document.getElementById("guestName").value.trim();
       
     let guestEmail = document.getElementById("guestEmail").value.trim();
       
      let guestPhone = document.getElementById("guestPhone").value.trim();
       
       let checkIn = document.getElementById("checkIn").value;
       
       let checkOut = document.getElementById("checkOut").value;
        
        let guests = Number(document.getElementById("guests").value);
        
          // ===============================
           // GET SELECTED ROOM
           // ===============================
  let selectedRoom = document.querySelector('input[name="room"]:checked');
         
           // ===============================
           // CHECK ROOM SELECTION 
           // ===============================
        if(!selectedRoom) {
            alert("Please select a room.");
            return;  
        }
        
         let roomName = selectedRoom.value;
         let roomPrice = rooms[roomName];
         
           // ===============================
           // CALCULATE NIGHTS
           // ===============================
         let checkInDate = new  Date(checkIn);
         let checkOutDate = new Date(checkOut);
         let difference = checkOutDate - checkInDate;
         let nights = difference / (1000 * 60 * 60 * 24);
         
           // ===============================
           // CHECK DATES
           // ===============================
          if(nights <= 0) {
              alert("check-out date must be after check-in date.");
              return;
          }
          
          
    
    
              // ===============================
             // CALCULATE TOTAL 
             // ===============================
           let total = roomPrice * nights;
           
           // ===============================
            // GET BOOKING SUMMARY AREA
            // ===============================
         let bookingSummary = document.getElementById("bookingSummary");
         
           // ===============================
            // SHOW BOOKING SUMMARY 
            // ===============================
         bookingSummary.innerHTML = `
          <div class="booking-summary-card">
              <h2> Booking Summary 🏩</h2>
              
              <p> <strong>Guest:</Strong>
               ${guestName} </p>
               
               <p> <strong>Email:</Strong>
               ${guestEmail} </p>
               
               <p> <strong>Phone:</Strong>
               ${guestPhone} </p>    
               
               <p> <strong>Room:</Strong>
               ${roomName} </p> 
               
                 <p> <strong>Price:</Strong>
               ₦${roomPrice.toLocaleString()} / night </p>     
               
                   <p> <strong>Check-in:</Strong>
                   ${checkIn} </p>  
               
                    <p> <strong>Check-out:</Strong>
                  ${checkOut} </p>    
               
                   <p> <strong>Nights:</Strong>
                    ${nights} </p>   
               
                   <p> <strong>Guests:</Strong>
               ${guests} </p>  
               
               <hr>
               
               <h3> Total: ₦${total.toLocaleString()} </h3>
               
                <button id="confirmBooking"> Confirm Booking  </button>
               
               <button id="cancelBooking"> Cancel </button>
               
               </div>
               `;
            
            // ===============================
            // CANCEL BOOKING 
            // ===============================
       let cancelBooking = document.getElementById("cancelBooking");
       
       cancelBooking.addEventListener("click",function () {
           let confirmCancel = confirm("Are you sure you want to cancel this booking?");
           if(confirmCancel) {
           
               bookingSummary.innerHTML = `
               
               <div class="booking-cancelled">
                   
                  // <h2> Booking Cancelled ❌ </h2>
                   <p> Your booking has been cancelled </p>
                   </div>
                   `;
           }
         
       });
       
           // ===============================
            // CONFIRM BOOKING 
            // ===============================
       let confirmBooking = document.getElementById("confirmBooking");
       
       confirmBooking.addEventListener("click", function () {
          
            // ===============================
            // GENERATE BOOKING ID
            // ===============================
          let bookingId = "AUR-" + Math.floor(10000 + Math.random() * 90000);
          
            // ===============================
            // CREATE BOOKING OBJECT 
            // ===============================
         let bookingDetails = {
          id: bookingId, guest: { name:guestName, email: guestEmail, phone: guestPhone },
           
           room:{ name: roomName, price:roomPrice },
           
           checkIn: checkIn, 
           checkOut: checkOut,
           nights: nights,
           guests: guests,
           total: total,
           date: new Date().toLocaleString(),
           status:"Booking Confirmed"
           };
           
            // ===============================
            // GET EXISTING BOOKING HISTORY 
            // ===============================
            let savedBookings = localStorage.getItem("bookingHistory");
            
            let bookingHistory = savedBookings? JSON.parse(savedBookings):[];
            
            // ===============================
            // ADD NEW BOOKING 
            // ===============================
            bookingHistory.push(bookingDetails);
            
            // ===============================
            // SAVE BOOKING HISTORY 
            // ===============================
          localStorage.setItem("bookingHistory", JSON.stringify(bookingHistory));
          
           // ===============================
            // SHOW SUCCESS MESSAGE 
            // ===============================
          bookingSummary.innerHTML = `
          <div class="booking-success">
              <h2> Booking Confirmed 🎉</h2>
              <p> Thank you, ${guestName}!</p>
              <p> Your room has been successfully booked.</p>
            <h3> Booking ID:${bookingId} 🎉</h3>
             <p> <Strong>Room:</strong> ${roomName} </p>
             <p> <Strong>Check-In:</strong> ${checkIn} </p>
             <p> <Strong>Check-Out:</strong> ${checkOut} </p>
             <p> <Strong>Total:</strong> ${total.toLocaleString()} </p>
             <p> <Strong>Status:</strong> Booking Confirmed ✅ </p>
               <button id="viewBookings"> View Booking History </button >
               <button id="sendWhatsapp"> Send Booking To Whatsapp </button>
             <button id="backHome"> Back To Home </button >
             </div>
               `;
               
               // ===============================
              // VIEW BOOKING HISTORY 
              // ===============================
          let viewBookings = document.getElementById("viewBookings");
          
          viewBookings.addEventListener("click", function () {
              window.location.href = "bookingHistory.html";
          });
          
             // ===============================
              // BACK HOME 
              // ===============================
       let backHome = document.getElementById("backHome") ;
       
       backHome.addEventListener("click", function () {
           window.location.href = "index.html";
       });     
       
        // ===============================
              // WHATSAPP BUTTON CLICK
              // ===============================
         let sendWhatsapp = document.getElementById("sendWhatsapp");
         
       sendWhatsapp.addEventListener("click", function () {
           let message = `
             *Aurelia Grand Hotel - New Booking*
             
             Booking ID: ${bookingId}
             
             Guest: ${guestName}
             Email: ${guestEmail}
             Phone: ${guestPhone}
             
             Room: ${roomName}
             Check-in: ${checkIn}
             Check-out: ${checkOut}
             
             Nights: ${nights}
             Guests:${guests}
             
             Total: ${total.toLocaleString()}
             
             Status: Booking Confirmed ✅
             `;
             
             let hotelWhatsappNumber = "2348100462356";
             
             let whatsappURL = "https://wa.me/" + hotelWhatsappNumber + "?text=" + encodeURIComponent(message);
             
             window.open(whatsappURL, "-blank");
       });
                   });
     
        })
        
           }
          
            
              
              // ===============================
              //  PREVENT PAST CHECK-IN DATES
              // ===============================
        let today = new Date().toISOString().split("T")[0];
        
    //this part runs when the booking form exists after clicking Book Now.
    //We use event delegation because d form is create dynamically.
    
    document.addEventListener("click", function (event) {
        if(event.target.classList.contains("bookRoom")) { 
            setTimeout (function () {
                let checkIn = document.getElementById("checkIn");
                if(checkIn) {
                    checkIn.min = today;
                }
            },0);
            
        }
    });   
