function joinNS(endpoint) {
  const nsSocket = io(`http://localhost:9000/${endpoint}`);
  nsSocket.on("nsRoomLoad", (nsRooms) => {
    let roomList = document.querySelector(".room-list");
    roomList.innerHTML = "";

    nsRooms.forEach((room) => {
      const glyph = room.private === true ? "lock" : "globe";
      roomList.innerHTML += `<li class='room'> <span class='glyphicon glyphicon-${glyph}'> </span>${room.roomTitle}</li>`;
    });

    // add click listener for each room
    const roomNodes = document.getElementsByClassName("room");
    Array.from(roomNodes).forEach((elem) => {
      elem.addEventListener("click", (e) => {
        console.log("someone clicked on", e.target.innerHTML);
      });
    });
  });
}
