
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace SampleReact.Controllers
{
    public class SignalRCounter : Hub
    {
        public async  Task IncrementCounter()
        {

            List<String> ConnectionIDToIgnore = new List<String>();
            ConnectionIDToIgnore.Add(Context.ConnectionId);
            // return Clients.AllExcept(ConnectionIDToIgnore).SendAsync("IncrementCounter");
            await  Clients.AllExcept(ConnectionIDToIgnore).SendAsync("IncrementCounter","Message IncrementCounter recieved...");
        }

        public Task DecrementCounter()
        {
            List<String> ConnectionIDToIgnore = new List<String>();
            ConnectionIDToIgnore.Add(Context.ConnectionId);
            return Clients.AllExcept(ConnectionIDToIgnore).SendAsync("DecrementCounter");
        }
    }
}
