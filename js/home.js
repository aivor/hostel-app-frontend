var localToken = window.localStorage.getItem("token");
  function logout(){
    window.localStorage.clear()
  }
  
   if(!localToken){
     window.location.href = "home.html"
   }
   else{
    var requestOptions = {
      method: 'GET',
      headers: {
            "Authorization" :`localToken ${localToken}`,
          },
          
};

// fetching all rooms
  fetch('https://hostel-management-api.herokuapp.com/api/rooms',requestOptions) 
  .then((res)=> res.json())
  .then((data)=> {
    let output = '';
    data.rooms.forEach(function(item) {
      output += `
        <div class="col-xl-3 col-md-6 mb-4" id="${item._id}">
              <div class="card ">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-3">
                      <div class="text-m font-weight-bold text-primary text-uppercase mb-2">
                      Room Number: ${item.roomNumber}</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">Price(GHC): ${item.price}</div>
                      <span style="float: left;" >
                        <!-- edit room trigger button -->
                        <button class="btn btn-primary btn-user btn-circle edit_id" 
                        data-toggle="modal" data-target="#editRoomModal">Edit</button>
                      </span>
                      <span style="float: right;" >
                        <!-- edit room trigger button -->
                        <button class="btn btn-secondary btn-user btn-block detail_id" 
                        data-toggle="modal" data-target="#modal2" >Details</button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
            
      `
     

      
    });
    document.getElementById('output').innerHTML = output;
    // editing already existing rooms

    let class_name = document.getElementsByClassName("edit_id")
        var id
        for(let i = 0; i < class_name.length; i++){
          class_name[i].addEventListener("click", get_id)
        }
        function get_id(e){

           id = e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id
           

           return id
        }


        let details = document.getElementsByClassName("detail_id")
        for(let i = 0; i < details.length; i++){
            details[i].addEventListener("click", get_id_and_detail)
        }
        function get_id_and_detail(e){

         let  id = e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id
           

           fetch(`https://hostel-management-api.herokuapp.com/api/room/${id}`,{
            method: 'get',
            headers: {
              "Content-Type": "application/json",
              "Authorization" :`localToken ${localToken}`
        
            }
          })
          .then(function(response){
            return response.json()
          })
        
          .then((response) => {
              let mbody = ''
            mbody += `
                <div>
                   <ul>
                    <li>Room number: ${response.room.roomNumber}</li>
                    <li>Capacity: ${response.room.capacity}</li>
                    <li>Room Items: ${response.room.furniture}</li>
                    <li>Price GHC ${response.room.price}</li>
                    <li>No_of students: ${response.numOfStudents}</li>
                   </ul>



                </div>
            `
            document.getElementById('mbody').innerHTML = mbody;
           })

           
        }
        
        
           

        document.getElementById('editRoomForm').addEventListener('submit',editRoom);
        function editRoom(e){
          e.preventDefault()
          let room_number = document.getElementById('eroom_number').value;
          let furniture = document.getElementById('efurniture').value;
          let capacity = document.getElementById('ecapacity').value;
          let price = document.getElementById('eprice').value;

 
 fetch(`https://hostel-management-api.herokuapp.com/api/room/${id}`,{
    method: 'put',
    headers: {
      "Content-Type": "application/json",
      "Authorization" :`localToken ${localToken}`

    },
    redirect: 'follow',
    body: JSON.stringify({
        room_number:  room_number.toUpperCase(),
        furniture: furniture,
        capacity: capacity,
        price: price})
  })
  .then(function(response){
    return response.json()
  })

  .then((response) => {
    alert(response.message)
    location.reload()
  
   })  
}   
  })
  
// register new occupants

  document.getElementById('myForm').addEventListener('submit',register);
function register(e){
  e.preventDefault();


 let first_name = document.getElementById('first_name').value;
 let middle_name = document.getElementById('middle_name').value;
 let last_name = document.getElementById('Last_name').value;
 let phone = document.getElementById('phone').value;
 let email = document.getElementById('email').value;
 let year = document.getElementById('year').value;
 let date_of_birth = document.getElementById('date_of_birth').value;
 let room = document.getElementById('room').value;
 let amount = document.getElementById('amount').value;
 
 
 fetch(`https://hostel-management-api.herokuapp.com/api/student/register`,{
    method: 'post',
    headers: {
      "Content-Type": "application/json",
      "Authorization" :`localToken ${localToken}`
    },
    timeout: 0,
    body: JSON.stringify({first_name,middle_name,
      last_name,phone,
      email,year,date_of_birth,
      room,amount})
  })
  .then(function(response){
    return response.json()
  })

  .then((response) => {
    alert(response.message)
    location.reload()
   })
   .catch(error => console.log('error', error));
}
// Adding new rooms
document.getElementById('addForm').addEventListener('submit',addRoom);

function addRoom(e){
  e.preventDefault();

 let room_number = document.getElementById('room_number').value;
 let furniture = document.getElementById('furniture').value;
 let capacity = document.getElementById('capacity').value;
 let price = document.getElementById('price').value;

 
 fetch(`https://hostel-management-api.herokuapp.com/api/room/add`,{
    method: 'post',
    headers: {
      "Content-Type": "application/json",
      "Authorization" :`localToken ${localToken}`

    },
    timeout: 0,
    redirect: 'follow',
    body: JSON.stringify({
        room_number:  room_number.toUpperCase(),
        furniture: furniture,
        capacity: capacity,
        price: price})
  })
  .then(function(response){
    return response.json
  })

  .then((response) => {
    location.reload()
   })
   .catch(error => console.log('error', error));
}

// getting data to the addroom form

var requestOptions = {
      method: 'GET',
      headers: {
            "Authorization" :`localToken ${localToken}`,
          },
          
};

// fetching all rooms
  fetch('https://hostel-management-api.herokuapp.com/api/rooms',requestOptions) 
  // .then(response => response.text())
  // .then(result => console.log(result))
  // .catch(error => console.log('error', error));
  .then((res)=> res.json())
  .then((data)=> {
    let output = '';
    data.rooms.forEach(function(item) {
      room += `
          <option value=${item._id}>${item.roomNumber}</option>
              
      `
      
    });
    document.getElementById('room').innerHTML = room;
    
  })



  // getting data to the addroom form

var requestOptions = {
    method: 'GET',
    headers: {
          "Authorization" :`localToken ${localToken}`,
        },
        
  };
  
  
  
   }