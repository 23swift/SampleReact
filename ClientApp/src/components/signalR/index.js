import * as signalR  from '@aspnet/signalr'







const signalRConnection=  new signalR.HubConnectionBuilder()
    .withUrl("/signalrcounter")
    .build();

//     signalRConnection.on("IncrementCounter", data => {
//          console.log(data);
//       });

//    signalRConnection.start().then().catch(function (err) {
//         return console.error(err.toString());
//     });
    

export default signalRConnection;