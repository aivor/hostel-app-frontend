// Call the dataTables jQuery plugin
var localToken = window.localStorage.getItem("token"); 

$(document).ready(function() {

  fetch(`https://hostel-management-api.herokuapp.com/api/students`, {
    method: 'get',
    headers: {
      "Content-Type": "application/json",
      "Authorization" :`localToken ${localToken}`

    },
})
.then((res)=> res.json())
.then(data => {
  let occupant ='';
  data.forEach(function(item) {
    occupant += `
    
                    <tr>
                      <td>${item.first_name} ${item.last_name} </td>
                      <td>${item.email}</td>
                      <td>(233)${item.phone}</td>
                      <td>${item.dateOfBirth.slice(0,10)}</td>
                      <td>${item.year}</td>
                      <td>${item.amount}</td>
                      <td>${item.room.roomNumber}</td>
                      <td><button class="btn btn-primary btn-user btn-block editOccupant_id" 
                      data-toggle="modal" data-target="#editOccupantModal" id="${item._id}">Update</button></td>
                    </tr>
                    
                 
    `
  })
  document.getElementById('occupant').innerHTML = occupant;  
  $('#dataTable').DataTable();


// editing occupants

  let class_name = document.getElementsByClassName("editOccupant_id")
        var id
        for(let i = 0; i < class_name.length; i++){
          class_name[i].addEventListener("click", get_id)
        }
        function get_id(e){

           id = e.currentTarget.id

           return id
           
        }

document.getElementById('editOccupantRoomForm').addEventListener('submit',editOccupantRoom);
        function editOccupantRoom(e){
          e.preventDefault()
          console.log(id)
          
 let first_name = document.getElementById('efirst_name').value;
 let middle_name = document.getElementById('emiddle_name').value;
 let last_name = document.getElementById('eLast_name').value;
 let phone = document.getElementById('ephone').value;
 let email = document.getElementById('eemail').value;
 let year = document.getElementById('eyear').value;
 let date_of_birth = document.getElementById('edate_of_birth').value;
 let room = document.getElementById('room1').value;
 let amount = document.getElementById('eamount').value;

 
 fetch(`https://hostel-management-api.herokuapp.com/api/student/${id}/update`,{
    method: 'put',
    headers: {
      "Content-Type": "application/json",
      "Authorization" :`localToken ${localToken}`

    },
    redirect: 'follow',
    body: JSON.stringify({"exit" : true,first_name,middle_name,last_name,phone,email,year,date_of_birth,room,amount})
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






// fetching all rooms
fetch('https://hostel-management-api.herokuapp.com/api/rooms',requestOptions) 
.then((res)=> res.json())
.then((data)=> {
let output = '';
data.rooms.forEach(function(item) {
  room1 += `
      <option value=${item._id}>${item.roomNumber}</option>
          
  `
  
});
document.getElementById('room1').innerHTML = room1;

})

});
