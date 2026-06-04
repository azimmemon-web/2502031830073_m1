function showMsg(){
    alert("Thanks For Visiting My Portfolio");
}

function showMenu(){

    let menu = document.getElementById("menu");

    if(menu.style.display === "flex"){
        menu.style.display = "none";
    }

    else{
        menu.style.display = "flex";
    }
}