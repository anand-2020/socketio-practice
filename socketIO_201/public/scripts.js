const socket = io("http://localhost:9000"); // the / namespace/endpoint

console.log(socket.io);
socket.on("connect", () => {
  console.log(socket.id);
});

// listen for nsList, which is a list of all the namespaces.
socket.on("nsList", (nsData) => {
  // console.log(nsData)
  let namespacesDiv = document.querySelector(".namespaces");
  namespacesDiv.innerHTML = "";
  nsData.forEach((ns) => {
    namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint} ><img src="${ns.img}" /></div>`;
  });

  // Add a clicklistener for each NS
  // console.log(document.getElementsByClassName("namespace"));
  Array.from(document.getElementsByClassName("namespace")).forEach((elem) => {
    elem.addEventListener("click", (e) => {
      const nsEndpoint = elem.getAttribute("ns");
      console.log(`moving to ${nsEndpoint}`);
    });
  });
});

socket.on("messageFromServer", (dataFromServer) => {
  console.log(dataFromServer);
  socket.emit("dataToServer", { data: "Data from the Client!" });
});

document.querySelector("#message-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const newMessage = document.querySelector("#user-message").value;
  socket.emit("newMessageToServer", { text: newMessage });
});

socket.on("messageToClients", (msg) => {
  console.log(msg);
  document.querySelector("#messages").innerHTML += `<li>${msg.text}</li>`;
});
