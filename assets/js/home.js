console.log("My script is loaded!");

document.addEventListener('mouseover', function(event){
    if(event.target.className==='contact'){
        event.target.classList.add('levitate');
        
        event.target.addEventListener('mouseleave', function(event){
            event.target.classList.remove('levitate');
        });
    }
});